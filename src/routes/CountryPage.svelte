<script>
  import { meta } from "tinro";
  import TrendChart from "./../TrendChart.svelte";
  import { country, allCountryData } from "./../data/DataStore.js";

  const route = meta();
  country.set(route.params.country);
  $: console.log($allCountryData.renew);
  let width;
  let height;
</script>

<div class="wrapper">
  <div class="row">
    <div class="cell">
      <h2>{$country}</h2>
      <p>
        {$country} has {$allCountryData.gasgrid[1][0].status} on banning connections
        to the gas grid.
      </p>
      <p>
        The national renovation strategy is {$allCountryData.credibility[1][0]
          .status}
      </p>
      <ul>
        <li>
          Effective energy efficiency promotion: {$allCountryData
            .credibility[1][0]["effective.ee.promotion"]}
        </li>
        <li>Financing: {$allCountryData.credibility[1][0]["financing"]}</li>
        <li>
          Energy poverty: {$allCountryData.credibility[1][0]["energy.poverty"]}
        </li>
      </ul>
    </div>
    <div class="cell">
      <h3>Final energy consumption</h3>
      <div
        class="chart-container"
        bind:offsetWidth={width}
        bind:offsetHeight={height}
      >
        <TrendChart
          {width}
          {height}
          countryData={$allCountryData.fec}
          displayUnits={"values"}
        />
      </div>
    </div>
    <div class="cell">
      <h3>Final energy consumption households</h3>
      <div
        class="chart-container"
        bind:offsetWidth={width}
        bind:offsetHeight={height}
      >
        <TrendChart
          {width}
          {height}
          countryData={$allCountryData.fechh}
          displayUnits={"values"}
        />
      </div>
    </div>
  </div>
  <div class="row">
    <div class="cell">
      <h3>Renewables in FEC in households</h3>
      <div
        class="chart-container"
        bind:offsetWidth={width}
        bind:offsetHeight={height}
      >
        <TrendChart
          {width}
          {height}
          countryData={$allCountryData.renew}
          displayUnits={"renew.perc"}
        />
      </div>
    </div>
    <div class="cell">
      <h3>Population with bad housing condition</h3>
      <div
        class="chart-container"
        bind:offsetWidth={width}
        bind:offsetHeight={height}
      >
        <TrendChart
          {width}
          {height}
          countryData={$allCountryData.housing}
          displayUnits={"values"}
        />
      </div>
    </div>
    <div class="cell">
      <h3>Population unable to keep home warm</h3>
      <div
        class="chart-container"
        bind:offsetWidth={width}
        bind:offsetHeight={height}
      >
        <TrendChart
          {width}
          {height}
          countryData={$allCountryData.poverty}
          displayUnits={"values"}
        />
      </div>
    </div>
  </div>
</div>

<style>
  .wrapper {
    flex: 1;
  }
  .row {
    display: flex;
    height: 50%;
    flex-wrap: wrap;
  }
  .cell {
    flex: 1;
    background-color: #e6e6fa;
    min-width: 300px;
  }

  .chart-container {
    width: 100%;
    height: 100%;
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
