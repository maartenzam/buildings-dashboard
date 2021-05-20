<script>
  import Select, { Option } from "@smui/select";

  export let selectedIndicator;

  export let selectedUnit = "absolute";
</script>

{#if selectedIndicator.indicatorUnits.length > 0}
  <Select
    bind:value={selectedUnit}
    label="Units"
    style={"width: 300px;"}
    disabled={selectedIndicator.indicatorUnits.length === 1}
  >
    {#each selectedIndicator.indicatorUnits as opt}
      <Option value={opt.unitsCode} selected={selectedUnit === opt.unitsCode}
        >{`${opt.unitsName} - ${opt.unitsShort}`}</Option
      >
    {/each}
  </Select>
{/if}

<style>
</style>
