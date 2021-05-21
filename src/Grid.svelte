<script>
  import TrendChart from "./TrendChart.svelte";
  import TrafficLightChart from "./TrafficLightChart.svelte";
  import { countryDataSet } from "./data/DataStore.js";
  let width;
  let height;
  export let selectedIndicator;
  export let countriesData;
  export let displayUnits;
  export let colorScales;

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
  <!--Grid of 7 rows and 7 columns-->
  {#each Array(7) as _, r}
    {#each Array(7) as _, c}
      <a href={`/${getCountryCode($countryDataSet.table, r + 1, c + 1)}`}>
        <div class="cell" bind:offsetWidth={width} bind:offsetHeight={height}>
          <!--Only charts where there is a country-->
          {#if $countryDataSet.table.filter((d) => d.col === c + 1 && d.row === r + 1).length > 0}
            {#if selectedIndicator.indicatorCode === "gasban" || selectedIndicator.indicatorCode === "credibility"}
              <!--No traffic light at EU level-->
              {#if !(c === 0 && r === 0)}
                <TrafficLightChart
                  {width}
                  {height}
                  countryData={countriesData.filter(
                    (d) =>
                      d[0] ===
                      getCountryCode($countryDataSet.table, r + 1, c + 1)
                  )[0]}
                  colorScale={colorScales[selectedIndicator.indicatorCode]}
                />
              {/if}
            {:else}
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
          {/if}
        </div>
      </a>
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
