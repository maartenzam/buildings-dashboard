<script>
  import Select, { Option } from "@smui/select";
  import indicators from "./data/Indicators.js";
  //import { selectedUnits } from "./data/DataStore.js";

  export let selectedIndicator;
  /*$: selectedUnits.set(selectedIndicator.indicatorUnits[0].unitsCode);
  $: console.log($selectedUnits);*/
</script>

<Select
  key={(indicator) => indicator.indicatorCode}
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
