<script>
  export let selectedIndicator;
  export let displayUnits;
  import { country, allCountryData } from "./data/DataStore.js";
  import TrendChart from "./TrendChart.svelte";

  $: console.log($country);
  $: console.log($allCountryData);

  let width;
  let height;

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
  <div class="modal-wrapper">
    <div class="modal">
      <span class="close" on:click={() => hide()}>&times;</span>
      <slot />
      <div
        class="chart-container"
        bind:offsetWidth={width}
        bind:offsetHeight={height}
      >
        <TrendChart
          width={width - 20}
          {height}
          countryData={$allCountryData.fec}
          {displayUnits}
          targetsData={$allCountryData.targets}
        />
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
