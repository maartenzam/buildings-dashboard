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

  let indicatorValue = "fec";
  //  let unitsValue = "absolute";
  $: unitsValue = indicators.filter(
    (d) => d.indicatorCode === indicatorValue
  )[0].indicatorUnits[0].unitsCode;
  $: console.log(indicatorValue);
  $: console.log(
    indicators.filter((d) => d.indicatorCode === indicatorValue)[0]
  );
  $: console.log(unitsValue);

  $: dataMap = {
    fec: {
      data: $fecGdpDataSet.byCountry,
      absolute: "values",
      relative: "relative",
    },
  };

  //$: countryData = dataMap[indicatorValue].data;
  $: countryData = dataMap["fec"].data;
</script>

<div class="left">
  <div class="select-container">
    <IndicatorSelector bind:indicatorValue />
    <UnitSelector bind:unitsValue {indicatorValue} />
  </div>
  <!--svg {width} {height} /-->
  <!--div
    class="chart-wrapper"
    bind:offsetWidth={width}
    bind:offsetHeight={height}
  >
    <TrendChart {width} {height} {countryData} />
  </div-->
  <Grid {countryData} />
</div>
<div class="right">
  <h2>
    {indicators.filter((d) => d.indicatorCode === indicatorValue)[0]
      .indicatorName}
  </h2>
  <p>
    {indicators.filter((d) => d.indicatorCode === indicatorValue)[0]
      .indicatorExplanation}
  </p>
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
