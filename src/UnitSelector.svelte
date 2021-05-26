<script>
  import Select, { Option } from "@smui/select";
  import { selectedUnits } from "./data/DataStore.js";

  export let selectedIndicator;
  export let selectedUnit = selectedIndicator.indicatorUnits[0].unitsCode;
  //disabled={selectedIndicator.indicatorUnits.length === 1}
  /*$: console.log($selectedUnits);
  $: if ($selectedUnits === undefined) {
    selectedUnits.set(selectedIndicator.indicatorUnits[0].unitsCode);
  }*/
</script>

{#if selectedIndicator.indicatorUnits.length > 0}
  <Select bind:value={selectedUnit} label="Units" style={"width: 300px;"}>
    {#each selectedIndicator.indicatorUnits as opt}
      <Option value={opt.unitsCode}
        >{`${opt.unitsName} - ${opt.unitsShort}`}</Option
      >
    {/each}
  </Select>
{/if}

<style>
</style>
