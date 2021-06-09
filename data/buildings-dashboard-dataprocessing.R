## ECF buildings dashboard data processing ##

## Following packages need to be installed first with install.packages()
library(eurostat)
library(dplyr)
library(readxl)
library(countrycode)
library(tidyr)
library(xlsx)
library(geofacet)
library(zoo)

aggregates <- c("EA19", "EU28")
nonmembers <- c("TR", "NO", "IS", "AL", "BA", "MD", "ME", "MK", "UA", "XK", "UK", "RS", "GE")

# Download the energy balance database from Eurostat. This takes a while, it is 230 MB
energy.balance.raw <- get_eurostat("nrg_bal_c")

# 1. Final energy consumption
# Filter the relevant data
fec <- filter(energy.balance.raw,
              nrg_bal == "FEC2020-2030",
              siec == "TOTAL",
              unit == "KTOE",
              !(geo %in% aggregates),
              !(geo %in% nonmembers),
              time > "2004-01-01",)

# Get the gdp data from Eurostat
gdp.raw <- get_eurostat("nama_10_gdp")
# Gross Domestic Product at Market Prices, 2010 prices in million euros
gdp <- filter(gdp.raw,
              na_item == "B1GQ",
              unit == "CLV10_MEUR",
              time > "2004-01-01",) %>%
  select(geo, time, gdp = values)

# Join FEC and GDP data together, based on country (geo) and year (time)
fec.gdp <- left_join(fec, gdp, by = c("geo", "time")) %>%
  # Switch units from KTOE to MTOE
  mutate(values = values/1000) %>%
  # Ton oil equivalent per million euro gdp
  mutate(relative = values/gdp*1000000) %>%
  rename(absolute = values) %>%
  select(geo, time, absolute, relative)

# Read the targets from the Excel file
targets.raw <- read_excel("20210210 dashboard indicators_tests.xlsx", sheet = "indicator 1", range = "A35:M63")
targets <- select(targets.raw, 1, 11,13)
colnames(targets) <- c("country", "target.necp", "target.euco")
targets <- mutate(targets, country = ifelse(country == "Germany (until 1990 former territory of the FRG)", "Germany", country))
# Add targets from https://ec.europa.eu/energy/topics/energy-efficiency/targets-directive-and-rules/eu-targets-energy-efficiency_en#2020-targets
targets.2020 <- read_excel("fec_targets_2020.xlsx")

targets <- left_join(targets, targets.2020, by = "country")

# Country names to country codes
targets$geo <- countrycode(targets$country, origin = "country.name", destination = "eurostat")
targets <- mutate(targets, geo = ifelse(is.na(geo), "EU27_2020", geo)) %>%
  mutate(country = ifelse(country == "EU27_2020", "EU27", country)) %>%
  select(geo, target.necp, target.euco, target.2020)

# Additional target for fechh
target.fechh <- read_excel("dashboard-data_bon.xlsx", sheet = "targets") %>%
  select(geo, target.fechh)

targets <- left_join(targets, target.fechh, by = "geo")

# 3b. Impact of renovation strategies on the built environment
# Get heat demand data from Eurostat
heat.demand.raw <- get_eurostat("nrg_d_hhq")
heat.demand <- filter(heat.demand.raw, siec == "TOTAL") %>%
  # Filter for household energy use, total and space heating
  filter(nrg_bal %in% c("FC_OTH_HH_E", "FC_OTH_HH_E_SH")) %>%
  filter(time == "2018-01-01") %>%
  select(geo, nrg_bal, values) %>%
  pivot_wider(names_from = nrg_bal, values_from = values) %>%
  # "demand" is the share of household energy use used for space heating (in 2018)
  mutate(demand = round(FC_OTH_HH_E_SH/FC_OTH_HH_E, 2)) %>%
  select(geo, demand)

# Household energy use
hh <- filter(energy.balance.raw,
             nrg_bal == "FC_OTH_HH_E",
             siec == "TOTAL",
             unit == "KTOE",
             !(geo %in% aggregates),
             !(geo %in% nonmembers),
             time > "2004-01-01")

# Heating degree days factor
# Get heating degree days data from Eurostat
heatcool.raw <- get_eurostat("nrg_chdd_a")
heatdegreedays <- filter(heatcool.raw,
                         # Only take heating degree days
                         indic_nrg == "HDD",
                         !(geo %in% aggregates),
                         !(geo %in% nonmembers),
                         time > "1989-01-01")

# Rolling means
hdd.rollmeans <- group_by(heatdegreedays, geo) %>%
  arrange(time) %>%
  mutate(lagvalues = lag(values, 1)) %>%
  # 10 year rolling mean
  mutate(rollavg = rollmean(lagvalues, k = 10, align = "right", fill = c(NA,NA,NA))) %>%
  # hdd.ind (heating degree indicator) is the ratio between current year hdd and the average of the 10 years before
  mutate(hdd.ind = round(values/rollavg, 2)) %>%
  ungroup() %>%
  filter(time > "2004-01-01") %>%
  select(geo, time, hdd.ind)

# OLD METHOD, NOT USED: compares years to the 1990-2015 average
# hdd.avg <- filter(heatdegreedays, time > "1989-01-01", time < "2016-01-01") %>%
#   group_by(geo) %>%
#   summarise(avg = mean(values))

# heatdegreedays <- left_join(heatdegreedays, hdd.avg, by = "geo") %>%
#   mutate(hdd.factor = round(values/avg, 2)) %>%
#   select(geo, time, hdd.factor)

# Population
# Get population data from Eurostat, and filter
pop.raw <- get_eurostat("demo_pjan")
pop <- filter(pop.raw,
              age == "TOTAL",
              sex == "T",
              !(geo %in% aggregates),
              !(geo %in% nonmembers),
              time > "2004-01-01") %>%
  select(geo, time, pop = values)

# Join everything together
hh.all <- left_join(hh, hdd.rollmeans, by = c("geo", "time")) %>%
  left_join(pop, by = c("geo", "time")) %>%
  left_join(heat.demand, by = "geo") %>%
  # Switch from KTOE to MTOE
  mutate(values = values/1000) %>%
  # Climate corrected values
  mutate(climate = (values*demand/hdd.ind + values*(1-demand))) %>%
  # Climate corrected values, in kg/capita
  mutate(climatecapita = climate/pop*1000000000) %>%
  rename(absolute = values) %>%
  select(geo, time, absolute, climate, climatecapita)

# 4. Share of renewables, with and without biomass
siec.values <- c("TOTAL", "RA000", "RA200", "RA410", "RA600")
hh.renew <- filter(energy.balance.raw,
                   nrg_bal == "FC_OTH_HH_E",
                   siec %in% siec.values,
                   unit == "KTOE",
                   !(geo %in% aggregates),
                   !(geo %in% nonmembers),
                   time > "2004-01-01")
hh.renew.wide <- pivot_wider(hh.renew, names_from = siec, values_from = values) %>%
  mutate(share = round(RA000/TOTAL*100, 1)) %>%
  ## RA200 = Geothermal, RA410 = Solarthermal, RA600 = Ambient heat
  mutate(sharenobiom = round((RA200 + RA410 + RA600)/TOTAL*100, 1)) %>%
  select(geo, time, share, sharenobiom)

## OLD
# fuels.raw <- get_eurostat("nrg_ind_fecf")
# fuels <- filter(fuels.raw,
#                 # Total household energy use
#                 nrg_bal == "FC_OTH_HH_E",
#                 # Share of renewables and biomass
#                 siec == "RA000",
#                 !(geo %in% aggregates),
#                 !(geo %in% nonmembers))

# Extract share of biomass for each country from the Excel
# Get the value for Belgium
# share.biomass.be <- read_excel("SUMMARY-results-SHARES-2019.xlsx", sheet = "BE", range = "R38:R40", col_names = c("test"))
# share.biomass <- round(share.biomass.be[1,]$test/share.biomass.be[3,]$test*100, 1)
# geo <- c('BE')
# share.bm <- c(share.biomass)
# share.bm.all <- data.frame(geo, share.bm)
# 
# # Loop over the sheets in the file
# sheets <- excel_sheets("SUMMARY-results-SHARES-2019.xlsx")
# for(sht in 5:41){
#   if(sht == 5){
#     sht <- 3
#   }
#   print(sheets[sht])
#   share.biomass.raw <- read_excel("SUMMARY-results-SHARES-2019.xlsx", sheet = sheets[sht], range = "R38:R40", col_names = c("data"))
#   share.country.biomass <- round(share.biomass.raw[1,]$data/share.biomass.raw[3,]$data*100, 1)
#   geo <- c(sheets[sht])
#   share.bm <- c(share.country.biomass)
#   share.bm.df <- data.frame(geo, share.bm)
#   share.bm.all <- rbind(share.bm.all, share.bm.df)
# }
# 
# share.bm.all <- filter(share.bm.all, !(geo %in% nonmembers))
# # Join the the fuels and share of biomass together, compute the share of renewables (without biomass)
# fuels.bm <- left_join(fuels, share.bm.all, by = "geo") %>%
#   mutate(share.res = round(values*(100 - share.bm)/100, 1))

# 5. Housing and energy poverty
# Get the data on bad housing conditions from Eurostat, and filter
housing.raw <- get_eurostat("ilc_mdho01")
housing <- filter(housing.raw,
                  sex == "T",
                  age == "TOTAL",
                  !(geo %in% aggregates),
                  !(geo %in% nonmembers),
                  incgrp == "TOTAL",
                  hhtyp == "TOTAL",
                  time > "2004-01-01") %>%
  rename(share = values) %>%
  select(geo, time, share)

# Get the data on energy poverty from Eurostat, and filter
poverty.raw <- get_eurostat("sdg_07_60")
poverty <- filter(poverty.raw,
                  !(geo %in% aggregates),
                  !(geo %in% nonmembers),
                  incgrp == "TOTAL",
                  hhtyp == "TOTAL",
                  time > "2004-01-01") %>%
  rename(share = values) %>%
  select(geo, time, share)

# Ternary data
gas.grid <- read_excel("traffic_light_indicators_data-2021-06-04.xlsx", sheet = "ban_gas_grid")
gas.grid$name <- countrycode(gas.grid$geo, origin = "eurostat", destination = "country.name")
gas.grid[is.na(gas.grid)] <- "No policies"
credibility = read_excel("traffic_light_indicators_data-2021-06-04.xlsx", sheet = "credibility_renovation_strategy")
credibility$name <- countrycode(credibility$geo, origin = "eurostat", destination = "country.name")
credibility <- credibility %>% rename(status = LTRS)

# Country codes
EU27 <- eu_grid1
# Replace UK with EU27, and swap Ireland with EU27, so the latter is on top
EU27 <- mutate(EU27, code = ifelse(code == "UK", "EU27_2020", code)) %>%
  mutate(name = ifelse(name == "United Kingdom", "EU27", name)) %>%
  mutate(row = ifelse(name == "Ireland", 2, row)) %>%
  mutate(row = ifelse(name == "EU27", 1, row))

# Country centroids
centroids <- read.csv("country_centroids_az8.csv", stringsAsFactors = F)
centroids.EU <- mutate(centroids, iso_a2 = ifelse(iso_a2 == "GR", "EL", iso_a2)) %>%
  filter(iso_a2 %in% EU27$code) %>%
  select(iso_a2, sovereignt, Longitude, Latitude)

pop.20 <- filter(pop, time == "2020-01-01") %>% select(-time)

centroids.EU <- left_join(centroids.EU, pop.20, by = c("iso_a2" = "geo")) %>%
  rename(code = iso_a2, name = sovereignt, long = Longitude, lat = Latitude) %>%
  mutate(long = ifelse(code == "FR", 2.2781109, long)) %>%
  mutate(lat = ifelse(code == "FR", 47.2012479, lat)) %>%
  mutate(long = ifelse(code == "FI", 25.275255, long)) %>%
  mutate(lat = ifelse(code == "FI", 62.30821528, lat)) %>%
  mutate(long = ifelse(code == "SE", 14.686196, long)) %>%
  mutate(lat = ifelse(code == "SE", 59.4432748, lat)) %>%
  mutate(lat = ifelse(code == "MT", 35, lat)) %>%
  mutate(lat = ifelse(code == "CY", 34, lat))

# Write everything to Excel
## Time stamped file name, to be changed in src/data/AboutText.js
excel.name <- paste ("../public/EFC-buildings-dashboard-data-", Sys.Date(), ".xlsx", sep="")
write.xlsx2(fec.gdp, excel.name, sheetName = "fec.gdp")
write.xlsx2(targets, excel.name, sheetName = "targets", append = TRUE)
write.xlsx2(hh.all, excel.name, sheetName = "fec.households", append = TRUE)
write.xlsx2(hh.renew.wide, excel.name, sheetName = "fec.households.renewables", append = TRUE)
#write.xlsx2(fuels.bm, "dashboard-data.xlsx", sheetName = "renewables", append = TRUE)
write.xlsx2(housing, excel.name, sheetName = "housing", append = TRUE)
write.xlsx2(poverty, excel.name, sheetName = "poverty", append = TRUE)
write.xlsx2(gas.grid, excel.name, sheetName = "gas.grid", append = TRUE)
write.xlsx2(credibility, excel.name, sheetName = "credibility", append = TRUE)
write.xlsx2(EU27, "dashboard-data.xlsx", sheetName = "countries", append = TRUE)

# Write everything for dashboard
write.csv(fec.gdp, file = "../public/data/fec-gdp.csv", row.names = FALSE)
write.csv(hh.all, file = "../public/data/fec-hh.csv", row.names = FALSE)
write.csv(hh.renew.wide, file = "../public/data/renew-hh.csv", row.names = FALSE)
write.csv(housing, file = "../public/data/housing.csv", row.names = FALSE)
write.csv(poverty, file = "../public/data/poverty.csv", row.names = FALSE)
write.csv(gas.grid, file = "../public/data/gas-grid.csv", row.names = FALSE)
write.csv(credibility, file = "../public/data/credibility.csv", row.names = FALSE)
write.csv(EU27, file = "../public/data/EU27.csv", row.names = FALSE)
write.csv(targets, file = "../public/data/targets.csv", row.names = FALSE)
write.csv(centroids.EU, file = "../public/data/centroids.csv", row.names = FALSE)
