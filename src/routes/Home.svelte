<script>
  import Grid from "./../Grid.svelte";
  import IndicatorSelector from "../IndicatorSelector.svelte";
  import UnitSelector from "../UnitSelector.svelte";
  import {
    fecGdpDataSet,
    fecHhDataSet,
    renewHhDataSet,
    povertyDataSet,
    housingDataSet,
    gasGridDataSet,
    credibilityDataSet,
  } from "./../data/DataStore.js";
  import indicators from "./../data/Indicators.js";
  import Modal from "./../Modal.svelte";
  import Treemap from "./../Treemap.svelte";
  import EUMap from "./../EUMap.svelte";

  let modal;

  let width;
  let height;

  let selectedIndicator = indicators[0];
  let selectedUnit = "absolute";

  $: dataMap = {
    fec: {
      data: $fecGdpDataSet.byCountry,
      absolute: "absolute",
      relative: "relative",
    },
    fechh: {
      data: $fecHhDataSet.byCountry,
      absolute: "absolute",
      climate: "climate",
      climatecapita: "climatecapita",
    },
    renewables: {
      data: $renewHhDataSet.byCountry,
      share: "share",
      sharenobiom: "sharenobiom",
    },
    housing: {
      data: $housingDataSet.byCountry,
      share: "share",
    },
    poverty: {
      data: $povertyDataSet.byCountry,
      share: "share",
    },
    gasban: {
      data: $gasGridDataSet.byCountry,
    },
    credibility: {
      data: $credibilityDataSet.byCountry,
    },
  };

  const trafficLightColors = ["#387E90", "#F5B944", "#E34C27"];

  const colorScales = {
    gasban: {
      adopted: trafficLightColors[0],
      announced: trafficLightColors[1],
      "no policy": trafficLightColors[2],
    },
    credibility: {
      credible: trafficLightColors[0],
      "partly credible": trafficLightColors[1],
      "not credible": trafficLightColors[2],
    },
  };

  $: countriesData = dataMap[selectedIndicator.indicatorCode].data;
  $: displayUnits = dataMap[selectedIndicator.indicatorCode][selectedUnit];

  $: treemapData = countriesData.map((d) => {
    const country = d[0];
    const absolute = d[1].slice(-1)[0].absolute;
    return {
      parent: "root",
      country: country,
      absolute: absolute,
    };
  });
</script>

<div class="left">
  <div class="select-container">
    <IndicatorSelector bind:selectedIndicator bind:selectedUnit />
    <UnitSelector bind:selectedUnit {selectedIndicator} />
  </div>

  {#if selectedIndicator.indicatorCode === "gasban" || selectedIndicator.indicatorCode === "credibility"}
    <EUMap {selectedIndicator} />
  {:else}
    <Grid
      {selectedIndicator}
      {countriesData}
      {displayUnits}
      {colorScales}
      {modal}
    />
  {/if}
</div>
<div class="right">
  <h2>{selectedIndicator.indicatorName}</h2>
  <p>{selectedIndicator.indicatorExplanation}</p>
  {#if displayUnits === "absolute"}
    <div
      class="treemap-container"
      bind:offsetWidth={width}
      bind:offsetHeight={height}
    >
      <Treemap {treemapData} {width} {height} />
    </div>
  {/if}
</div>
<Modal bind:this={modal} {selectedIndicator} {displayUnits}>
  <button on:click={() => modal.hide()}>Close</button>
</Modal>

<style>
  .left {
    border-right: 1px solid #f8f7f7;
    flex: 100000 0 200px;
    position: relative;
    min-height: 300px;
    max-height: 900px;
    padding: 10px;
    width: 100%;
  }
  .right {
    flex: 1 10000 300px;
    padding: 1rem;
    width: 100%;
  }
  .treemap-container {
    width: 100%;
    height: 400px;
  }
</style>
