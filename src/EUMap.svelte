<script>
  import { geoAzimuthalEqualArea, geoPath } from "d3-geo";
  import { scaleSqrt } from "d3-scale";
  import { onMount } from "svelte";
  import { feature } from "topojson";
  import { centroidsDataSet, gasGridDataSet } from "./data/DataStore.js";

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

  const sizeScale = scaleSqrt().domain([0, 85000000]).range([0, 36]);

  let data = [];
  const width = 960;
  const height = 500;

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

  const projection = geoAzimuthalEqualArea().rotate([-10, -52, 0]);

  const mapPadding = 20;
  projection.fitExtent(
    [
      [mapPadding, mapPadding],
      [width - mapPadding, height - mapPadding],
    ],
    mapExtent
  );

  let currentProj = projection;
  let path = geoPath().projection(currentProj);

  onMount(async function () {
    const response = await fetch("/data/countries-50m.json");
    const json = await response.json();
    const topoData = feature(json, json.objects.countries);
    const land = {
      ...topoData,
      features: topoData.features /*.filter(
        (d) => d.properties.type === "Sovereigncountry"
      ),*/,
    };
    data = land.features;
  });
</script>

<svg width="960" height="500">
  {#each data as feature}
    <path d={path(feature)} class="country" fill={"#cccccc"} />
  {/each}
  {#each $centroidsDataSet.table as bubble}
    <circle
      class="bubble"
      cx={projection([bubble.long, bubble.lat])[0]}
      cy={projection([bubble.long, bubble.lat])[1]}
      r={sizeScale(bubble.pop)}
      fill={colorScales.gasban[
        $gasGridDataSet.table.find((d) => d.geo === bubble.code).status
      ]}
    />
  {/each}
</svg>

<style>
  svg {
    width: 960px;
    height: 500px;
    background-color: "#eeeeee";
  }
  .country {
    stroke: #444444;
    stroke-width: 0.5;
  }
  .bubble {
    stroke: white;
    stroke-width: 1px;
    opacity: 0.8;
  }
</style>
