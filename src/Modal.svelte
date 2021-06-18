<script>
  export let selectedIndicator;
  export let displayUnits;
  import {
    allCountryData /*, country, countryDataSet*/,
  } from "./data/DataStore.js";
  import TrendChart from "./TrendChart.svelte";
  import { fade } from "svelte/transition";
  import { downloadPng } from "svg-crowbar";

  let width;
  let height;

  //$: countryName = $countryDataSet.table.find((d) => d.code === $country).name;

  let shown = false;
  export function show() {
    shown = true;
  }
  export function hide() {
    shown = false;
  }

  function downloadChart() {
    downloadPng(
      document.querySelector("#downloadable"),
      "buildings_dashboard_chart"
    );
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
  <div class="modal-wrapper" on:click={() => hide()} transition:fade>
    <div class="modal">
      <div class="modal-header">
        <span class="close" on:click={() => hide()}
          ><img
            src="./close.svg"
            alt="Close modal"
            width={32}
            height={32}
          /></span
        >
        <span class="download" on:click={downloadChart}
          ><img
            src="./download.svg"
            alt="Download chart"
            width={32}
            height={32}
          /></span
        >
        <!--h2>
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
        </p-->
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
            targetsData={selectedIndicator.indicatorCode !== "fec" &&
            selectedIndicator.indicatorCode !== "fechh"
              ? undefined
              : $allCountryData.targets}
            freeScales={true}
            {selectedIndicator}
            {shown}
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
    max-height: 500px;
  }
  .close,
  .download {
    float: right;
    cursor: pointer;
  }
  .download {
    margin-right: 10px;
  }
  .download:hover {
    stroke: "black";
  }
  .chart-container {
    height: 100%;
    width: 100%;
  }
</style>
