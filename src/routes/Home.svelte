<script>
  import Grid from "./../Grid.svelte";
  import IndicatorSelector from "../IndicatorSelector.svelte";
  import UnitSelector from "../UnitSelector.svelte";
  import { fecGdpDataSet } from "./../data/DataStore.js";
  import indicators from "./../data/Indicators.js";

  //let width = "100%";
  //let height = "100%";
  let width;
  let height;

  let selectedIndicator = indicators[0];
  let selectedUnit;
  //$: console.log(selectedIndicator);
  //$: console.log(selectedUnit);

  $: dataMap = {
    fec: {
      data: $fecGdpDataSet.byCountry,
      absolute: "values",
      relative: "relative",
    },
  };

  //$: countryData = dataMap[indicatorValue].data;
  $: countriesData = dataMap["fec"].data;
</script>

<div class="left">
  <div class="select-container">
    <IndicatorSelector bind:selectedIndicator />
    <UnitSelector bind:selectedUnit {selectedIndicator} />
  </div>
  <Grid {countriesData} />
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
