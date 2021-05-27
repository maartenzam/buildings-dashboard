<script>
  export let selectedIndicator;
  export let displayUnits;
  import { country, allCountryData, countryDataSet } from "./data/DataStore.js";
  import TrendChart from "./TrendChart.svelte";

  let width;
  let height;

  $: countryName = $countryDataSet.table.find((d) => d.code === $country).name;

  let shown = false;
  export function show() {
    shown = true;
  }
  export function hide() {
    shown = false;
  }
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.keyCode == 27) {
      hide();
    }
  }}
/>

{#if shown}
  <div class="modal-wrapper" on:click={() => hide()}>
    <div class="modal">
      <div class="modal-header">
        <span class="close" on:click={() => hide()}>&times;</span>
        <h2>
          {`${countryName}, ${selectedIndicator.indicatorName}`}
        </h2>
        <p>
          {`${
            selectedIndicator.indicatorUnits.find(
              (d) => d.unitsCode === displayUnits
            ).unitsName
          } (${
            selectedIndicator.indicatorUnits.find(
              (d) => d.unitsCode === displayUnits
            ).unitsShort
          })`}
        </p>
      </div>
      <div class="modal-content">
        <div
          class="chart-container"
          bind:offsetWidth={width}
          bind:offsetHeight={height}
        >
          <TrendChart
            {width}
            {height}
            countryData={$allCountryData[selectedIndicator.indicatorCode]}
            {displayUnits}
            targetsData={selectedIndicator.indicator !== "fec"
              ? undefined
              : $allCountryData.targets}
          />
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-wrapper {
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .modal {
    background-color: white;
    max-width: 80vw;
    height: 80vh;
    padding: 1rem;
    margin: 5% auto;
    display: flex;
    flex-direction: column;
  }
  .modal-content {
    flex: 1;
  }
  .close {
    float: right;
    cursor: pointer;
  }
  .close:hover {
    font-weight: bold;
  }
  .chart-container {
    height: 100%;
    width: 100%;
  }
</style>
