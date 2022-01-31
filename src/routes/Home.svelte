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
  let mapWidth;
  let mapHeight;

  let selectedIndicator = indicators[0];
  let selectedUnit = "absolute";

  // Get the data and map the columns in the data to the selected units
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
      newoil: "oil.new",
      newgas: "gas.new",
      existingoil: "oil.existing",
      existinggas: "gas.existing",
    },
    credibility: {
      data: $credibilityDataSet.byCountry,
      credibility: "credibility",
    },
  };

  $: countriesData = dataMap[selectedIndicator.indicatorCode].data;
  $: displayUnits = dataMap[selectedIndicator.indicatorCode][selectedUnit];

  $: treemapData = countriesData.map((d) => {
    const country = d[0];
    const years = d[1].map(d => d.time)
    const mostRecentDate = years.reduce(function (a, b) { return a > b ? a : b; });
    const absolute = d[1].find(d => d.time === mostRecentDate).absolute;
    return {
      parent: "root",
      country: country,
      absolute: absolute,
      time: mostRecentDate
    };
  });
</script>

<div class="left">
  <div class="select-container">
    <IndicatorSelector bind:selectedIndicator bind:selectedUnit />
    <UnitSelector bind:selectedUnit {selectedIndicator} />
    <div class="countrypage-link">
      <a href="/country/EU27_2020">Country page view</a>
    </div>
  </div>

  {#if selectedIndicator.indicatorCode === "gasban" || selectedIndicator.indicatorCode === "credibility"}
    <div
      class="map-container"
      bind:offsetWidth={mapWidth}
      bind:offsetHeight={mapHeight}
    >
      <EUMap
        {selectedIndicator}
        {displayUnits}
        width={mapWidth}
        height={mapHeight}
      />
    </div>
  {:else}
    <Grid {selectedIndicator} {countriesData} {displayUnits} {modal} />
  {/if}
</div>
<div class="right">
  <h2>{selectedIndicator.indicatorName}</h2>
  <div>{@html selectedIndicator.indicatorExplanation}</div>
  {#if displayUnits === "absolute"}
    <div class="treemap-title">
      {`${selectedIndicator.treeMapTitle} (${$fecGdpDataSet.latestYear})`}
    </div>
    <div
      class="treemap-container"
      bind:offsetWidth={width}
      bind:offsetHeight={height}
    >
      <Treemap {treemapData} {width} {height} />
    </div>
  {/if}
  <div class="updated">
    <p>Last update: {selectedIndicator.indicatorUpdateDate}</p>
  </div>
  {#if selectedIndicator.indicatorSources.length > 0}
    <div class="sources">
      <p>
        {selectedIndicator.indicatorSources.length > 1
          ? "Data sources"
          : "Data source"}<br />
        {#each selectedIndicator.indicatorSources as source}
          <a href={source.url} target="_blank">{source.text}</a><br />
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
    padding: 10px;
    width: 100%;
  }
  .countrypage-link {
    float: right;
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
  .treemap-title {
    font-weight: bold;
  }
  .sources,
  .updated {
    font-size: 0.85rem;
    opacity: 0.7;
  }
  .map-container {
    /*width: 100%;*/
    height: 100%;
    max-height: 800px;
  }
</style>
