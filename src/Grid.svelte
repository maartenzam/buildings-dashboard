<script>
  import TrendChart from "./TrendChart.svelte";
  import TrafficLightChart from "./TrafficLightChart.svelte";
  import TargetsLegend from "./TargetsLegend.svelte";
  import TrafficLightLegend from "./TrafficLightLegend.svelte";
  import { countryDataSet, targetsDataSet } from "./data/DataStore.js";
  import LinkIcon from "./LinkIcon.svelte";

  let width;
  let height;
  export let selectedIndicator;
  export let countriesData;
  export let displayUnits;
  export let colorScales;
  export let modal;

  // No targets for other indicators and units then fec and fechh in absolute units
  $: targetsData =
    (selectedIndicator.indicatorCode === "fec" ||
      selectedIndicator.indicatorCode === "fechh") &&
    displayUnits === "absolute"
      ? $targetsDataSet.byCountry
      : [];

  // Fix scales for fec-relative, fechh-climatecapita, renewables-share, renewables-sharenobiom, housing and poverty
  function getDomain(arr, units) {
    if (arr.length > 0) {
      let min = arr[0][1][0][units];
      let max = arr[0][1][0][units];
      arr.forEach((cntr) => {
        cntr[1].forEach((d) => {
          if (d[units] > max) {
            max = d[units];
          }
          if (d[units] < min) {
            min = d[units];
          }
        });
      });
      return [min, max];
    } else {
      return [0, 1];
    }
  }
  $: yDomain = getDomain(countriesData, displayUnits);

  $: freeScales =
    (selectedIndicator.indicatorCode === "fec" &&
      displayUnits === "absolute") ||
    (selectedIndicator.indicatorCode === "fechh" &&
      displayUnits === "absolute") ||
    (selectedIndicator.indicatorCode === "fechh" && displayUnits === "climate");

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
        <div class={c === 0 && r === 0 ? "cell" : "cell"}>
          {#if c === 0 && r === 0}
            <div class={c === 0 && r === 0 ? "highlight-title title" : "title"}>
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
                <LinkIcon />
                <!--img
                  src="./external-link-icon.svg"
                  alt="ECF logo"
                  width="10px"
                  height="10px"
                /-->
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
                {freeScales}
                {yDomain}
              />
            {/if}
          </div>
        </div>
      {:else if r === 0 && c === 6 && (selectedIndicator.indicatorCode === "fec" || selectedIndicator.indicatorCode === "fechh") && displayUnits === "absolute"}
        <div class="cell border">
          <div class="title highlight-title">Targets</div>
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
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  }
  .cell:hover {
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.4);
  }
  .cell.empty {
    background-color: transparent;
    box-shadow: none;
  }
  .chart-container {
    height: 100px;
  }
  .title {
    text-align: center;
    font-size: 11px;
    padding: 2px;
    background-color: white;
  }
  .highlight-title {
    background-color: rgba(29, 182, 193, 1);
    color: white;
    font-weight: bold;
  }
  .border {
    border: 1px solid #1db6c1;
    background-color: rgba(29, 182, 193, 0);
  }
</style>
