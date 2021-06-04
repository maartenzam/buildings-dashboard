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
    <Grid {selectedIndicator} {countriesData} {displayUnits} {modal} />
  {/if}
</div>
<div class="right">
  <h2>{selectedIndicator.indicatorName}</h2>
  <div>{@html selectedIndicator.indicatorExplanation}</div>
  {#if displayUnits === "absolute"}
    <h3>{selectedIndicator.treeMapTitle}</h3>
    <div
      class="treemap-container"
      bind:offsetWidth={width}
      bind:offsetHeight={height}
    >
      <Treemap {treemapData} {width} {height} />
    </div>
  {/if}
  {#if selectedIndicator.indicatorSources.length > 0}
    <div class="sources">
      <p>
        {selectedIndicator.indicatorSources.length > 1
          ? "Data sources"
          : "Data source"}<br />
        {#each selectedIndicator.indicatorSources as source}
          <a href={source.url}>{source.text}</a><br />
        {/each}
      </p>
    </div>
  {/if}
</div>
<Modal bind:this={modal} {selectedIndicator} {displayUnits}>
  <button on:click={() => modal.hide()}>Close</button>
</Modal>

<style>
  .left {
    border-right: 1px solid #f8f7f7;
    flex: 100000 1000000 200px;
    position: relative;
    min-height: 300px;
    /*max-height: 900px;*/
    padding: 10px;
    width: 100%;
  }
  .right {
    flex: 1 0 300px;
    padding: 1rem;
    width: 100%;
  }
  .right h2 {
    margin-top: -5px;
  }
  .treemap-container {
    width: 100%;
    height: 400px;
  }
  .sources {
    font-size: 0.85rem;
    opacity: 0.7;
  }
</style>
