<script>
  import Select, { Option } from "@smui/select";
  import indicators from "./data/Indicators.js";

  export let selectedIndicator;
</script>

<Select
  bind:value={selectedIndicator}
  label="Indicator"
  style={"width: 300px;"}
>
  {#each indicators as indicator}
    <Option value={indicator}>{indicator.indicatorName}</Option>
  {/each}
</Select>

<style>
</style>
