<script>
  import TrendChart from "./TrendChart.svelte";
  import { countryDataSet } from "./data/DataStore.js";
  let width;
  let height;
  export let countriesData;
  export let displayUnits;

  function getCountryCode(countrydata, row, column) {
    const countryCode = countrydata.filter(
      (d) => d.row === row && d.col === column
    );
    if (countryCode.length > 0) {
      return countryCode[0].code;
    }
  }
</script>

<div class="grid-container">
  {#each Array(7) as _, r}
    {#each Array(7) as _, c}
      <div class="cell" bind:offsetWidth={width} bind:offsetHeight={height}>
        {#if $countryDataSet.table.filter((d) => d.col === c + 1 && d.row === r + 1).length > 0}
          <TrendChart
            {width}
            {height}
            countryData={countriesData.filter(
              (d) =>
                d[0] === getCountryCode($countryDataSet.table, r + 1, c + 1)
            )[0]}
            {displayUnits}
          />
        {/if}
      </div>
    {/each}
  {/each}
</div>

<style>
  .grid-container {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(7, minmax(100px, 1fr));
    column-gap: 0.5rem;
    row-gap: 0.5rem;
  }
  .cell {
    background-color: #e6e6fa;
    max-height: 160px;
  }
</style>
