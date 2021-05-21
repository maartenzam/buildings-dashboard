<script>
  import Grid from "./../Grid.svelte";
  import IndicatorSelector from "../IndicatorSelector.svelte";
  import UnitSelector from "../UnitSelector.svelte";
  import {
    fecGdpDataSet,
    fecHhDataSet,
    renewHhDataSet,
    povertyDataSet,
    housingDataSet,
    gasGridDataSet,
    credibilityDataSet,
  } from "./../data/DataStore.js";
  import indicators from "./../data/Indicators.js";

  //let width = "100%";
  //let height = "100%";
  let width;
  let height;

  let selectedIndicator = indicators[0];
  let selectedUnit;
  //$: console.log(selectedIndicator.indicatorCode);
  //$: console.log(selectedUnit);

  $: dataMap = {
    fec: {
      data: $fecGdpDataSet.byCountry,
      absolute: "values",
      relative: "eneff",
    },
    fechh: {
      data: $fecHhDataSet.byCountry,
      absolute: "values",
      climate: "fechh",
      climatecapita: "fechh.cap",
    },
    renewables: {
      data: $renewHhDataSet.byCountry,
      share: "renew.perc",
      sharenobiom: "renew.nobiom.perc",
    },
    housing: {
      data: $housingDataSet.byCountry,
      share: "values",
    },
    poverty: {
      data: $povertyDataSet.byCountry,
      share: "values",
    },
    gasban: {
      data: $gasGridDataSet.byCountry,
    },
    credibility: {
      data: $credibilityDataSet.byCountry,
    },
  };

  const trafficLightColors = ["#387E90", "#F5B944", "#E34C27"];

  const colorScales = {
    gasban: {
      adopted: trafficLightColors[0],
      announced: trafficLightColors[1],
      "no policy": trafficLightColors[2],
    },
    credibility: {
      credible: trafficLightColors[0],
      "partly credible": trafficLightColors[1],
      "not credible": trafficLightColors[2],
    },
  };

  $: countriesData = dataMap[selectedIndicator.indicatorCode].data;
  $: displayUnits = dataMap[selectedIndicator.indicatorCode][selectedUnit];
</script>

<div class="left">
  <div class="select-container">
    <IndicatorSelector bind:selectedIndicator />
    <UnitSelector bind:selectedUnit {selectedIndicator} />
  </div>
  <Grid {selectedIndicator} {countriesData} {displayUnits} {colorScales} />
</div>
<div class="right">
  <h2>{selectedIndicator.indicatorName}</h2>
  <p>{selectedIndicator.indicatorExplanation}</p>
</div>

<style>
  .left {
    border-right: 1px solid #f8f7f7;
    flex: 100000 0 200px;
    position: relative;
    min-height: 300px;
  }
  .select-container {
  }
  .chart-wrapper {
    width: 160px;
    height: 160px;
  }
  .right {
    flex: 1 10000 300px;
    padding: 1rem;
    width: 100%;
  }
</style>
