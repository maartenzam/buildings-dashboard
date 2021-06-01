<script>
  import TrendChart from "./TrendChart.svelte";
  import TrafficLightChart from "./TrafficLightChart.svelte";
  import TargetsLegend from "./TargetsLegend.svelte";
  import TrafficLightLegend from "./TrafficLightLegend.svelte";
  import { countryDataSet, targetsDataSet } from "./data/DataStore.js";
  let width;
  let height;
  export let selectedIndicator;
  export let countriesData;
  export let displayUnits;
  export let colorScales;
  export let modal;

  $: targetsData =
    (selectedIndicator.indicatorCode === "fec" ||
      selectedIndicator.indicatorCode === "fechh") &&
    displayUnits === "absolute"
      ? $targetsDataSet.byCountry
      : [];

  function getCountryCode(countrydata, row, column) {
    const countryCode = countrydata.filter(
      (d) => d.row === row && d.col === column
    );
    if (countryCode.length > 0) {
      return countryCode[0].code;
    }
  }
  function getCountryName(countrydata, row, column) {
    const countryCode = countrydata.filter(
      (d) => d.row === row && d.col === column
    );
    if (countryCode.length > 0) {
      return countryCode[0].name;
    }
  }
</script>

<div class="grid-container">
  <!--Grid of 7 rows and 7 columns-->
  {#each Array(7) as _, r}
    {#each Array(7) as _, c}
      <!--Only charts where there is a country-->
      {#if $countryDataSet.table.filter((d) => d.col === c + 1 && d.row === r + 1).length > 0}
        <div class="cell">
          {#if c === 0 && r === 0}
            <div class="title">
              {getCountryName($countryDataSet.table, r + 1, c + 1)}
            </div>
          {:else}
            <a
              href={`/country/${getCountryCode(
                $countryDataSet.table,
                r + 1,
                c + 1
              )}`}
            >
              <div class="title">
                {getCountryName($countryDataSet.table, r + 1, c + 1)}
              </div>
            </a>
          {/if}
          <div
            class="chart-container"
            bind:offsetWidth={width}
            bind:offsetHeight={height}
          >
            {#if selectedIndicator.indicatorCode === "gasban" || selectedIndicator.indicatorCode === "credibility"}
              <!--No traffic light at EU level-->
              {#if !(c === 0 && r === 0)}
                <TrafficLightChart
                  {width}
                  {height}
                  countryData={countriesData.find(
                    (d) =>
                      d[0] ===
                      getCountryCode($countryDataSet.table, r + 1, c + 1)
                  )}
                  colorScale={colorScales[selectedIndicator.indicatorCode]}
                />
              {/if}
            {:else}
              <TrendChart
                {width}
                {height}
                countryData={countriesData.find(
                  (d) =>
                    d[0] === getCountryCode($countryDataSet.table, r + 1, c + 1)
                )}
                {displayUnits}
                targetsData={targetsData.find(
                  (d) =>
                    d[0] === getCountryCode($countryDataSet.table, r + 1, c + 1)
                )}
                {modal}
                {selectedIndicator}
              />
            {/if}
          </div>
        </div>
      {:else if r === 0 && c === 6 && (selectedIndicator.indicatorCode === "fec" || selectedIndicator.indicatorCode === "fechh") && displayUnits === "absolute"}
        <div class="cell">
          <div class="title">Targets</div>
          <div
            class="chart-container"
            bind:offsetWidth={width}
            bind:offsetHeight={height}
          >
            <TargetsLegend {width} {height} {selectedIndicator} />
          </div>
        </div>
      {:else if r === 0 && c === 6 && (selectedIndicator.indicatorCode === "gasban" || selectedIndicator.indicatorCode === "credibility")}
        <div class="cell">
          <div class="title">{selectedIndicator.indicatorCode}</div>
          <div
            class="chart-container"
            bind:offsetWidth={width}
            bind:offsetHeight={height}
          >
            <TrafficLightLegend
              {width}
              {height}
              colorScale={colorScales[selectedIndicator.indicatorCode]}
            />
          </div>
        </div>
      {:else}
        <div class="cell empty" />
      {/if}
    {/each}
  {/each}
</div>

<style>
  .grid-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, minmax(100px, 1fr));
    column-gap: 0.5rem;
    row-gap: 0.5rem;
    background-image: url("../Outline-Map-of-Europe-3-1-10perc.jpg");
    background-size: cover;
  }
  .cell {
    max-height: 150px;
    background-color: white;
  }
  .cell.empty {
    background-color: transparent;
  }
  .chart-container {
    height: 100px;
  }
  .title {
    text-align: center;
    font-size: 11px;
    background-color: white;
  }
</style>
