<script>
  import Select, { Option } from "@smui/select";
  import indicators from "./data/Indicators.js";

  export let indicatorValue;

  $: unitsOptions = indicators.filter(
    (d) => d.indicatorCode === indicatorValue
  )[0].indicatorUnits;

  export let unitsValue = "absolute";
</script>

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

<style>
</style>
