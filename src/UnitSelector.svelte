<script>
  import Select, { Option } from "@smui/select";
  import indicators from "./data/Indicators.js";
  import { fecGdpDataSet } from "./data/DataStore.js";

  export let indicatorValue = "fec";
  $: unitsOptions = indicators.filter(
    (d) => d.indicatorCode === indicatorValue
  )[0].indicatorUnits;

  let unitsValue = "absolute";

  $: dataMap = {
    fec: {
      data: $fecGdpDataSet.byCountry,
      absolute: "values",
      relative: "relative",
    },
  };

  $: countryData = dataMap[indicatorValue].data;
</script>

<div class="select-container">
  <Select bind:value={indicatorValue} label="Indicator" style={"width: 300px;"}>
    {#each indicators as indicator}
      <Option value={indicator.indicatorCode}>{indicator.indicatorName}</Option>
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

<style>
  .select-container {
    position: absolute;
    left: 1rem;
    top: 0rem;
  }
</style>
