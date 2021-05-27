<script>
  //import Select, { Option } from "@smui/select";
  import indicators from "./data/Indicators.js";

  export let selectedIndicator;
  export let selectedUnit;
</script>

<select
  key={(indicator) => indicator.indicatorCode}
  bind:value={selectedIndicator}
  label="Indicator"
  style={"width: 300px;"}
  on:change={() => {
    if (selectedIndicator.indicatorUnits.length > 0) {
      selectedUnit = selectedIndicator.indicatorUnits[0].unitsCode;
    }
  }}
>
  {#each indicators as indicator}
    <option value={indicator}>{indicator.indicatorName}</option>
  {/each}
</select>

<style>
</style>
