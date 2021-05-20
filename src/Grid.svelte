<script>
  import TrendChart from "./TrendChart.svelte";
  let width;
  let height;
  export let countryData;
</script>

<div class="grid-container">
  {#each Array(49) as _, i}
    <div class="cell" bind:offsetWidth={width} bind:offsetHeight={height}>
      <TrendChart {width} {height} {countryData} />
    </div>
  {/each}
</div>

<style>
  .grid-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(7, minmax(100px, 1fr));
    column-gap: 0.5rem;
    row-gap: 0.5rem;
  }
  .cell {
    background-color: #e6e6fa;
  }
</style>
