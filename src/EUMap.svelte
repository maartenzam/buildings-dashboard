<script>
  import { geoAzimuthalEqualArea, geoPath } from "d3-geo";
  import { scaleSqrt } from "d3-scale";
  import { onMount } from "svelte";
  import { feature } from "topojson";
  import {
    centroidsDataSet,
    gasGridDataSet,
    credibilityDataSet,
  } from "./data/DataStore.js";

  export let selectedIndicator;

  let width = 500;
  let height = 500;

  $: mapData =
    selectedIndicator.indicatorCode === "gasban"
      ? $gasGridDataSet.table
      : $credibilityDataSet.table;

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

  $: colorScale = colorScales[selectedIndicator.indicatorCode];

  const sizeScale = scaleSqrt().domain([0, 85000000]).range([0, 36]);

  let data = [];

  let mapExtent = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-30, 60],
          [35, 60],
          [35, 32],
          [-30, 32],
        ],
      ],
    },
  };

  const mapPadding = 20;

  $: console.log(width);

  $: projection = geoAzimuthalEqualArea()
    .rotate([-10, -52, 0])
    .fitExtent(
      [
        [mapPadding, mapPadding],
        [width - mapPadding, height - mapPadding],
      ],
      mapExtent
    );

  $: path = geoPath().projection(projection);

  onMount(async function () {
    const response = await fetch("/data/countries-50m.json");
    const json = await response.json();
    const topoData = feature(json, json.objects.countries);
    const land = {
      ...topoData,
      features: topoData.features,
    };
    data = land.features;
  });

  let bubble = false;
</script>

<!--label>
  <input type="checkbox" bind:checked={bubble} />
  Bubble map
</label-->

<div class="map-container" bind:offsetWidth={width} bind:offsetHeight={height}>
  <svg {width} {height}>
    <rect {width} {height} class="sea" />
    {#each data as feature}
      <path
        d={path(feature)}
        class="country"
        fill={mapData.find((d) => d.name === feature.properties.name) && !bubble
          ? colorScale[
              mapData.find((d) => d.name === feature.properties.name).status
            ]
          : "#ffffff"}
      />
    {/each}
    {#if bubble}
      {#each $centroidsDataSet.table as bubble}
        <circle
          class="bubble"
          cx={projection([bubble.long, bubble.lat])[0]}
          cy={projection([bubble.long, bubble.lat])[1]}
          r={sizeScale(bubble.pop)}
          fill={colorScale[
            $gasGridDataSet.table.find((d) => d.geo === bubble.code).status
          ]}
        />
      {/each}
    {/if}
  </svg>
</div>

<style>
  .map-container {
    width: 100%;
    height: 100%;
  }
  svg {
    background-color: "#eeeeee";
  }
  .country {
    stroke: #444444;
    stroke-width: 0.5;
  }
  .sea {
    fill: #55b4bf;
    opacity: 0.2;
  }
  .bubble {
    stroke: white;
    stroke-width: 1px;
    opacity: 0.9;
  }
  /*label {
    position: absolute;
    left: 10px;
    top: 80px;
    z-index: 10;
  }*/
</style>
