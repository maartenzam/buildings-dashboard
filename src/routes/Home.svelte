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
  let modal;

  //let width = "100%";
  //let height = "100%";
  let width;
  let height;

  let selectedIndicator = indicators[0];
  let selectedUnit;

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
</script>

<div class="left">
  <div class="select-container">
    <IndicatorSelector bind:selectedIndicator />
    <UnitSelector bind:selectedUnit {selectedIndicator} />
  </div>
  <Grid
    {selectedIndicator}
    {countriesData}
    {displayUnits}
    {colorScales}
    {modal}
  />
</div>
<div class="right">
  <h2>{selectedIndicator.indicatorName}</h2>
  <p>{selectedIndicator.indicatorExplanation}</p>
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
    padding: 10px;
  }
  .right {
    flex: 1 10000 300px;
    padding: 1rem;
    width: 100%;
  }
</style>
