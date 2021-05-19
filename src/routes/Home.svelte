<script>
  import Select, { Option } from "@smui/select";
  import { fecGdpDataSet } from "./../data/DataStore.js";
  import indicators from "./../data/Indicators.js";
  import TrendChart from "./../TrendChart.svelte";
  import { onMount } from "svelte";

  let indicatorValue = "fec";
  $: unitsOptions = indicators.filter(
    (d) => d.indicatorCode === indicatorValue
  )[0].indicatorUnits;

  let unitsValue = "absolute";

  //let width = "100%";
  //let height = "100%";
  let width;
  let height;

  $: dataMap = {
    fec: {
      data: $fecGdpDataSet.byCountry,
      absolute: "values",
      relative: "relative",
    },
  };

  $: countryData = dataMap[indicatorValue].data;
</script>

<div class="left">
  <!--svg {width} {height} /-->
  <div
    class="chart-wrapper"
    bind:offsetWidth={width}
    bind:offsetHeight={height}
  >
    <TrendChart {width} {height} {countryData} />
  </div>
  <div class="select-container">
    <Select
      bind:value={indicatorValue}
      label="Indicator"
      style={"width: 300px;"}
    >
      {#each indicators as indicator}
        <Option value={indicator.indicatorCode}
          >{indicator.indicatorName}</Option
        >
      {/each}
    </Select>

    {#if unitsOptions.length > 0}
      <Select
        bind:value={unitsValue}
        label="Units"
        style={"width: 300px;"}
        disabled={unitsOptions.length === 1}
      >
        {#each unitsOptions as opt}
          <Option value={opt.unitsCode}
            >{`${opt.unitsName} - ${opt.unitsShort}`}</Option
          >
        {/each}
      </Select>
    {/if}
  </div>
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
  .chart-wrapper {
    width: 160px;
    height: 160px;
  }
  .right {
    flex: 1 10000 300px;
    padding: 1rem;
    width: 100%;
  }
  .select-container {
    position: absolute;
    left: 1rem;
    top: 0rem;
  }
</style>
