<script>
  import { meta } from "tinro";
  import TrendChart from "./../TrendChart.svelte";
  import UnitSelector from "./../UnitSelector.svelte";
  import { router } from "tinro";
  import {
    country,
    allCountryData,
    countryDataSet,
  } from "./../data/DataStore.js";
  import indicators from "./../data/Indicators.js";

  const route = meta();
  country.set($route.params.country);

  $: countryName = $countryDataSet.table.find((d) => d.code === $country).name;

  $: countryOptions = $countryDataSet.table.sort((a, b) =>
    a.name > b.name ? 1 : -1
  );

  let width;
  let height;
  let selectedCountry;

  let selectedUnit = "absolute";
  let hhSelectedUnit = "absolute";
  let renewSelectedUnit = "share";
  let housingSelectedUnit = "share";
  let povertySelectedUnit = "share";
</script>

<div class="country-page-wrapper">
  <div class="title-row">
    <select
      bind:value={selectedCountry}
      on:change={() => {
        country.set(selectedCountry);
        router.goto(`/country/${selectedCountry}`);
      }}
      style={"width: 350px;"}
    >
      {#each countryOptions as cntr (cntr.code)}
        <option value={cntr.code} selected={cntr.code === $country}
          >{cntr.name}</option
        >
      {/each}
    </select>
    <div class="overview-link">
      <a href="/">Back to overview</a>
    </div>
  </div>
  <div class="title-row">
    <span
      style="border-bottom: 2px dashed steelblue; padding-bottom: 3px; stroke-linecap: round; color: steelblue; margin-right: 20px;"
      >Target 2020</span
    >
    <span
      style="border-bottom: 2px dashed orange; padding-bottom: 3px; stroke-linecap: round; color: orange; margin-right: 20px;"
      >2030 EU projection</span
    >
    <span
      style="border-bottom: 2px dashed purple; padding-bottom: 3px; stroke-linecap: round; color: purple"
      >2030 national contribution</span
    >
  </div>
  <div class="row">
    <div class="cell">
      <h3>Final energy consumption</h3>
      <UnitSelector selectedIndicator={indicators[0]} bind:selectedUnit />
      <div
        class="chart-container"
        bind:offsetWidth={width}
        bind:offsetHeight={height}
      >
        <TrendChart
          {width}
          {height}
          countryData={$allCountryData.fec}
          displayUnits={selectedUnit}
          targetsData={$allCountryData.targets}
          selectedIndicator={{ indicatorCode: "fec" }}
          freeScales={true}
        />
      </div>
    </div>
    <div class="cell">
      <h3>Final energy consumption households</h3>
      <UnitSelector
        selectedIndicator={indicators[1]}
        bind:selectedUnit={hhSelectedUnit}
      />
      <div
        class="chart-container"
        bind:offsetWidth={width}
        bind:offsetHeight={height}
      >
        <TrendChart
          {width}
          {height}
          countryData={$allCountryData.fechh}
          displayUnits={hhSelectedUnit}
          targetsData={$allCountryData.targets}
          selectedIndicator={{ indicatorCode: "fechh" }}
          freeScales={true}
        />
      </div>
    </div>
    <div class="cell">
      <h3>Renewables in FEC in households</h3>
      <UnitSelector
        selectedIndicator={indicators[2]}
        bind:selectedUnit={renewSelectedUnit}
      />
      <div
        class="chart-container"
        bind:offsetWidth={width}
        bind:offsetHeight={height}
      >
        <TrendChart
          {width}
          {height}
          countryData={$allCountryData.renewables}
          displayUnits={renewSelectedUnit}
          selectedIndicator={{ indicatorCode: "renewables" }}
          freeScales={true}
        />
      </div>
    </div>
  </div>
  <div class="row">
    <div class="cell">
      <h3>Population with bad housing condition</h3>
      <UnitSelector
        selectedIndicator={indicators[3]}
        bind:housingSelectedUnit
      />
      <div
        class="chart-container"
        bind:offsetWidth={width}
        bind:offsetHeight={height}
      >
        <TrendChart
          {width}
          {height}
          countryData={$allCountryData.housing}
          displayUnits={"share"}
          selectedIndicator={{ indicatorCode: "housing" }}
          freeScales={true}
        />
      </div>
    </div>
    <div class="cell">
      <h3>Population unable to keep home warm</h3>
      <UnitSelector
        selectedIndicator={indicators[4]}
        bind:povertySelectedUnit
      />
      <div
        class="chart-container"
        bind:offsetWidth={width}
        bind:offsetHeight={height}
      >
        <TrendChart
          {width}
          {height}
          countryData={$allCountryData.poverty}
          displayUnits={"share"}
          selectedIndicator={{ indicatorCode: "poverty" }}
          freeScales={true}
        />
      </div>
    </div>

    <div class="cell">
      {#if $country !== "EU27_2020"}
        <h3>Further indicators</h3>
        <p>
          {countryName} has {$allCountryData.gasgrid[1][0].status == "no policy"
            ? "no policty"
            : $allCountryData.gasgrid[1][0].status + " legislation"} to ban fossil
          fuels from heating houses.
        </p>
        <ul>
          {#if $allCountryData.gasgrid[1][0]["new.buildings"] != "NA"}
            <li>
              {`New buildings: ${$allCountryData.gasgrid[1][0]["new.buildings"]}`}
            </li>
          {/if}
          {#if $allCountryData.gasgrid[1][0]["existing.buildings"] != "NA"}
            <li>
              {`Existing buildings: ${$allCountryData.gasgrid[1][0]["existing.buildings"]}`}
            </li>
          {/if}
        </ul>
        <p>
          The national renovation strategy is {$allCountryData.credibility[1][0]
            .status}
        </p>
        <!--ul>
          <li>
            Effective energy efficiency promotion: {$allCountryData
              .credibility[1][0]["effective.ee.promotion"]}
          </li>
          <li>
            Appropriate financing: {$allCountryData.credibility[1][0][
              "financing"
            ]}
          </li>
          <li>
            Measures tackling energy poverty: {$allCountryData
              .credibility[1][0]["energy.poverty"]}
          </li>
        </ul-->
      {/if}
    </div>
  </div>
</div>

<style>
  .country-page-wrapper {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto 0 auto;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
  }
  .title-row {
    padding: 12px 12px 0px 12px;
  }
  .overview-link {
    float: right;
  }
  .cell {
    flex: 1;
    min-width: 374px;
    padding: 12px;
    box-sizing: border-box;
  }

  .chart-container {
    width: 100%;
    height: 300px;
  }

  @media (max-width: 900px) {
    .row {
      display: block;
    }
    .cell {
      width: 100%;
      margin: 0 0 10px 0;
    }
  }
</style>
