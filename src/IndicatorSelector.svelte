<script>
  import Select, { Option } from "@smui/select";
  import indicators from "./data/Indicators.js";

  export let indicatorValue;
</script>

<div class="select-container">
  <Select bind:value={indicatorValue} label="Indicator" style={"width: 300px;"}>
    {#each indicators as indicator}
      <Option value={indicator.indicatorCode}>{indicator.indicatorName}</Option>
    {/each}
  </Select>
</div>

<style>
  .select-container {
    z-index: 10;
  }
</style>
