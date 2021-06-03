<script>
  export let selectedIndicator;
  export let selectedUnit;

  let windowWidth;
  $: width = windowWidth < 700 ? "100%" : "350px";
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if selectedIndicator.indicatorUnits.length > 0}
  <select
    bind:value={selectedUnit}
    style={`width: ${width}`}
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
