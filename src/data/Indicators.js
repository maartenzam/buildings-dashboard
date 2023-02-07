const indicators = [
  {
    indicatorCode: "fec",
    indicatorName: "Final energy consumption (FEC)",
    indicatorExplanation: `
    <p>This indicator shows the development of <b>total energy end use</b> across all sectors compared to three benchmark levels.</p>
      <p>The <span style="border-bottom: 2px dashed steelblue; padding-bottom: 2px; stroke-linecap: round; color: steelblue">2020 target</span> set by Member States to contribute to the EU 20% energy efficiency target.</p>
      <p>The <span style="border-bottom: 2px dashed purple; padding-bottom: 2px; stroke-linecap: round; color: purple">2030 national contributions</span> to the EU energy efficiency target of 32.5% as set in National Energy and Climate Plans, leaving a gap of 3.1% points.</p>
      <p>The <span style="border-bottom: 2px dashed orange; padding-bottom: 2px; stroke-linecap: round; color: orange">2030 EU projections</span> for national final energy demand according to the EUCO3232.5 scenario in line with the EU’s energy targets modelled in 2018.</p>
    <p>Final energy consumption is influenced by economic activity. This is why the charts also show <b>energy intensity</b>, which is FEC/GDP.</p>`,
    indicatorUnits: [
      { unitsCode: "absolute", unitsName: "Absolute", unitsShort: "Mtoe/year" },
      {
        unitsCode: "relative",
        unitsName: "Relative to GDP",
        unitsShort: "toe/million € GDP",
      },
    ],
    indicatorUpdateDate: "17 January 2022",
    indicatorSources: [
      {
        text: "Eurostat FEC (Europe 2020-2030) [nrg_bal_c]",
        url: "https://ec.europa.eu/eurostat/databrowser/view/NRG_BAL_C__custom_4815050/default/table?lang=en",
      },
      {
        text: "Eurostat GDP [nama_10_gdp]",
        url: "https://ec.europa.eu/eurostat/databrowser/view/NAMA_10_GDP__custom_4859392/default/table?lang=en",
      },
    ],
    treeMapTitle: "FEC (Mtoe) by Members State",
  },
  {
    indicatorCode: "fechh",
    indicatorName: "Final energy consumption (FEC) in households",
    indicatorExplanation: `<p>FEC in households is a high-level indicator for the <b>impact of renovation strategies on the ground</b>: on average, two-thirds of residential energy demand is used for space heating. Together with water heating, space cooling, cooking and lighting, which are also in the scope of energy renovations, this rises to around 87% of residential energy demand. The remaining 13% are used for electrical appliances (see <a href="https://www.slideshare.net/sustenergy/energy-efficiency-trends-in-buildings-in-the-eu-update" target="_blank">Odyssee-Mure</a>).</p>
    <p>No specific target for final energy consumption in households is defined. As a <b>benchmark</b>, the dashboard therefore refers to figures for energy consumption in residential buildings by 2030 in the <a href="https://ec.europa.eu/energy/sites/ener/files/technical_note_on_the_euco3232_final_14062019.pdf" target="_blank">EUCO3232.5 scenario</a> modelled in 2018 (<span style="border-bottom: 2px dashed orange; padding-bottom: 2px; stroke-linecap: round; color: orange">2030 EU projection</span>). However, higher ambition will be needed to align with the new EU climate target of 55% by 2030.</a>
    <p>In order to increase accuracy, a <b>climate correction</b> is made, including the weighting of energy demand for heat which differs strongly between buildings located in colder or warmer climates.</p>
    <p>Furthermore, the climate corrected residential FEC is put in proportion to <b>population</b>, another important external factor influencing energy demand.</p>`,
    indicatorUnits: [
      { unitsCode: "absolute", unitsName: "Absolute", unitsShort: "Mtoe/year" },
      {
        unitsCode: "climate",
        unitsName: "Climate corrected",
        unitsShort: "Mtoe/year",
      },
      {
        unitsCode: "climatecapita",
        unitsName: "Climate corrected, per capita",
        unitsShort: "toe/cap/year",
      },
    ],
    indicatorUpdateDate: "17 January 2022",
    indicatorSources: [
      {
        text: "Eurostat FEC in households [nrg_bal_c]",
        url: "https://ec.europa.eu/eurostat/databrowser/view/NRG_BAL_C__custom_4815147/default/table?lang=en",
      },
      {
        text: "Eurostat Cooling and heating degree days [nrg_chdd_a]",
        url: "https://ec.europa.eu/eurostat/databrowser/view/NRG_CHDD_A__custom_4859484/default/table?lang=en",
      },
      {
        text: "Eurostat Disaggregated FEC in households [nrg_d_hhq]",
        url: "https://ec.europa.eu/eurostat/databrowser/view/NRG_D_HHQ__custom_4859653/default/table?lang=en",
      },
      {
        text: "Eurostat Population on 1 January [demo_pjan]",
        url: "https://ec.europa.eu/eurostat/databrowser/view/DEMO_PJAN__custom_4859748/default/table?lang=en",
      },
    ],
    treeMapTitle: "FEC (Mtoe) in households by Members State",
  },
  {
    indicatorCode: "renewables",
    indicatorName: "Renewables share in household FEC",
    indicatorExplanation: `<p>This indicator can be used as a proxy for buildings specific <b>decarbonisation of the heating systems</b>, as it shows the increase of the share of renewables in final energy consumption in households. The data provided by Eurostat <b>include biomass</b>. As the role of biomass to decarbonise heating is disputed, the second chart shows the renewables share in household FEC <b>without biomass</b>. Concretely, the chart without biomass includes solar thermal, geothermal and ambient heat (heat pumps).</p>
    <p>Solar photovoltaic is not applicable in these statistics as defined by Eurostat.</p>
    `,
    indicatorUnits: [
      { unitsCode: "share", unitsName: "Share", unitsShort: "percent" },
      {
        unitsCode: "sharenobiom",
        unitsName: "Share, without biomass",
        unitsShort: "percent",
      },
    ],
    indicatorUpdateDate: "17 January 2022",
    indicatorSources: [
      {
        text: "Eurostat Complete energy balances [nrg_bal_c]",
        url: "https://ec.europa.eu/eurostat/databrowser/view/NRG_BAL_C__custom_4859904/default/table?lang=en",
      },
    ],
  },
  {
    indicatorCode: "housing",
    indicatorName: "Population living in bad housing conditions",
    indicatorExplanation: `<p>This indicator is used to monitor progress on <b>high-energy performing, decent-quality housing</b>, by monitoring the percentage of people living in worst performing houses.</p>
      <p>It displays data from the "European Union Statistics on Income and Living Conditions (EU-SILC)" project to monitor the development of poverty and social inclusion in the EU. The data collection is based on a survey, which means that indicator values are self-reported. The charts show data from the indicator “Total population living in a dwelling with a leaking roof, damp walls, floors or foundation, or rot in window frames or floor”.
      </p>`,
    indicatorUnits: [
      { unitsCode: "share", unitsName: "Share", unitsShort: "percent" },
    ],
    indicatorUpdateDate: "17 January 2022",
    indicatorSources: [
      {
        text: "Eurostat EU-SILC Total population living in a dwelling with a leaking roof, damp walls, floors or foundation, or rot in window frames or floor [ilc_mdho01]",
        url: "https://ec.europa.eu/eurostat/databrowser/view/ILC_MDHO01__custom_4815309/default/table?lang=en",
      },
    ],
  },
  {
    indicatorCode: "poverty",
    indicatorName: "Population unable to keep home warm",
    indicatorExplanation: `
    <p>This indicator is used to monitor the <b>risk of energy poverty</b> development.</p>
    <p>It measures the share of “Population who are unable to keep home adequately warm by poverty status”. Data for this indicator are being collected as part of the "European Union Statistics on Income and Living Conditions (EU-SILC)" project to monitor the development of poverty and social inclusion in the EU. The data collection is based on a survey, which means that indicator values are self-reported.</p>
    <p>Additional information: <a href="https://www.energypoverty.eu/sites/default/files/downloads/publications/20-06/mj0420245enn.en_.pdf" target="_blank">EU Energy Poverty Observatory, Member State Reports on Energy Poverty 2019</a></p>
    `,
    indicatorUnits: [
      { unitsCode: "share", unitsName: "Share", unitsShort: "percent" },
    ],
    indicatorUpdateDate: "17 January 2022",
    indicatorSources: [
      {
        text: "Eurostat EU-SILC Population unable to keep home adequately warm by poverty status, total [sdg_07_60] ",
        url: "https://ec.europa.eu/eurostat/databrowser/view/SDG_07_60__custom_4815463/default/table?lang=en",
      },
    ],
  },
  {
    indicatorCode: "gasban",
    indicatorName: "Limiting use of fossil fuels in buildings",
    indicatorExplanation: `<p>To get on track to achieve a decarbonised heating systems, Member States are adopting legislation to limit the use of fossil fuels in buildings. Phasing out starts mostly by banning fossil fuel boilers and/or the connection to the gas grid for <b>new buildings</b>. Legislation on <b>existing buildings</b> allows longer time limits.</p>`,
    indicatorUnits: [
      {
        unitsCode: "newgas",
        unitsName: "New buildings",
        unitsShort: "legislation to ban use of gas",
      },
      {
        unitsCode: "newoil",
        unitsName: "New buildings",
        unitsShort: "legislation to ban use of oil",
      },
      {
        unitsCode: "existinggas",
        unitsName: "Existing buildings",
        unitsShort: "legislation to ban use of gas",
      },
      {
        unitsCode: "existingoil",
        unitsName: "Existing buildings",
        unitsShort: "legislation to ban use of oil",
      },
    ],
    indicatorUpdateDate: "22 June 2022",
    indicatorSources: [
      {
        text: "ECOS, Member States’ ambition to phase out fossil-fuel heating – an analysis, Background briefing, July 2021",
        url: "https://www.coolproducts.eu/wp-content/uploads/2021/07/ECOS-Coolproducts-Background-Briefing-MS-ambition-to-phase-out-fossil-fuel-heating.pdf",
      },
      {
        text: "Oeko-Institut, Phase-out regulations for fossil fuel boilers at EU and national level, October 2021",
        url: "https://www.oeko.de/fileadmin/oekodoc/Phase-out_fossil_heating.pdf",
      },
    ],
  },
  {
    indicatorCode: "credibility",
    indicatorName: "Credibility of renovation strategy (placeholder)",
    indicatorExplanation: `<p>In absence of a credibility assessment of renovation strategies, this section of the Dashboard reflects the availability of LTRSs. </p>
    <p>Member States had to notify the Commission their <a href="https://ec.europa.eu/energy/topics/energy-efficiency/energy-efficient-buildings/long-term-renovation-strategies_en" target="_blank">national Long-Term Renovation Strategies (LTRS)</a> by 10 March 2020. Most LTRSs were submitted with delay. </p>
    <p>Available information:</p>
    <p><a href="https://ec.europa.eu/energy/sites/default/files/swd-on-national-long-term-renovation-strategies.pdf" target="_blank">Analysis of the LTRSs</a>: On 15 December 2021, the European Commission published a Staff Working Document assessing the 26 LTRSs submitted. </p>
    <p><a href="https://www.renovate-europe.eu/renovate2recover-how-transformational-are-the-national-recovery-plans-for-buildings-renovation/" target="_blank">Renovate Europe Campaign/E3G, Renovate2Recover: How transformational are the National Recovery Plans for Buildings Renovation?</a> In October 2021, Renovate Europe published a study assessing the NRRPs of 15 Members States.</p>
    <p><a href="https://www.bpie.eu/publication/the-road-to-climate-neutrality-are-national-long-term-renovation-strategies-fit-for-2050/" target="_blank">The road to climate-neutrality</a>: In March 2021, BPIE published an analysis of 8 LTRSs whether they are in line with 2030 decarbonisation requirements and on a path towards total decarbonisation of the building stock by 2050.</p>
    <p>The <a href="https://www.greenrecoverytracker.org/" target="_blank">Green Recovery Tracker</a> assessed the Recovery and Resilience Plans. The Tracker provides an assessment of measures and allocation of funds in the buildings sector. It is continuously updated.</p>`,
    indicatorUnits: [
      {
        unitsCode: "credibility",
        unitsName: "LTRS",
        unitsShort: "status",
      },
    ],
    indicatorUpdateDate: "22 June 2022",
    indicatorSources: [],
  },
  {
    indicatorCode: "ambition",
    indicatorName: "Ambition level on energy efficiency (FEC)",
    indicatorExplanation: `<p>This indicator shows the <bold>energy efficiency ambition</bold> level of each Member State. Two methods are used:</p>
    <ol>
    <li>The Commission assessment of the final energy consumption (FEC) by 2030 indicated by Member States in their NECPs.</li>
    <li>The attitude of the Member State during the negotiation of the EED recast </li>
    </ol>
    <p>Member States had to submit by end of 2019 their National Energy and Climate Plan (NECP) for 2021-2030 to the Commission. In these NECPs, Member States set their national contribution to achieve the EU-wide energy efficiency target according to the Energy Efficiency Directive. The <a href="https://energy.ec.europa.eu/topics/energy-strategy/national-energy-and-climate-plans-necps_en#the-process" target="_blank"><bold>Commission assessed the NECPs</bold> and qualified the national contribution</a> as sufficient, moderate, low or very low (see summary of each assessment). The Commission found that the cumulative impact of the NECPs for energy efficiency (FEC) would sum up to 29.4%, falling short of the current target of 32.5%. Member States will have to update their NECP by June 2024 in order to take into account the new EU-wide energy efficiency target as agreed in the Energy Efficiency Directive recast.</p>

    <p>During the <bold>negotiation of the Energy Efficiency Directive recast</bold>, some Member States expressed concern about too high ambitions in the proposal and negotiation texts. This concern was expressed in joint comments by those less ambitious Member States dating from 13 April respective 8 June 2022. The Energy Ministers will discuss the EED recast on 27 June 2022.</p>`,
    indicatorUnits: [
      {
        unitsCode: "fecnecp",
        unitsName: "NECP",
        unitsShort: "assessment by COM",
      },
      {
        unitsCode: "recast",
        unitsName: "Attitude",
        unitsShort: "EED recast",
      },
    ],
    indicatorUpdateDate: "22 June 2022",
    indicatorSources: [],
  },
];

export default indicators;
