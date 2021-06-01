<script>
  //import Select, { Option } from "@smui/select";

  export let selectedIndicator;
  export let selectedUnit;
</script>

{#if selectedIndicator.indicatorUnits.length > 0}
  <select
    bind:value={selectedUnit}
    style={"width: 350px;"}
    disabled={selectedIndicator.indicatorUnits.length === 1}
  >
    {#each selectedIndicator.indicatorUnits as opt (opt.unitsCode)}
      <option value={opt.unitsCode}
        >{`${opt.unitsName} - ${opt.unitsShort}`}</option
      >
    {/each}
  </select>
{/if}

<style>
</style>
