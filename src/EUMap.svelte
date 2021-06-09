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
  import Tooltip, { Wrapper, Content } from "@smui/tooltip";

  export let selectedIndicator;
  export let width = 0;
  export let height = 0;

  $: mapData =
    selectedIndicator.indicatorCode === "gasban"
      ? $gasGridDataSet.table
      : $credibilityDataSet.table;

  const trafficLightColors = ["#387E90", "#F5B944", "#E34C27"];

  const colorScales = {
    gasban: {
      adopted: trafficLightColors[0],
      //announced: trafficLightColors[1],
      "no policy": trafficLightColors[2],
    },
    credibility: {
      "submitted / assessed": trafficLightColors[0],
      "submitted / not yet assessed": trafficLightColors[1],
      "not submitted": trafficLightColors[2],
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

  const margins = { top: 10, left: 0, right: 10, bottom: 0 };
  const legendHeight = 100 - margins.top - margins.bottom;
  const legendWidth = 200;
</script>

<!--label>
  <input type="checkbox" bind:checked={bubble} />
  Bubble map
</label-->

<svg {width} {height}>
  <rect {width} {height} class="sea" />
  {#each data as feature}
    <Wrapper>
      <path
        d={path(feature)}
        class="country"
        fill={mapData.find((d) => d.name === feature.properties.name) && !bubble
          ? colorScale[
              mapData.find((d) => d.name === feature.properties.name).status
            ]
          : "#ffffff"}
      />
      {#if selectedIndicator.indicatorCode === "gasban" && mapData.find((d) => d.name === feature.properties.name) !== undefined}
        <Tooltip rich
          ><Content
            >{@html `<b>${feature.properties.name}</b><br />
                <b>New buildings:</b> ${
                  mapData.find((d) => d.name === feature.properties.name)[
                    "new.buildings"
                  ]
                }<br />
                  <b>Existing buildings:</b> ${
                    mapData.find((d) => d.name === feature.properties.name)[
                      "existing.buildings"
                    ]
                  }`}
          </Content>
        </Tooltip>
      {/if}
    </Wrapper>
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
  {#each $centroidsDataSet.table as label}
    <a href={`/country/${label.code}`}>
      <text
        class="country-label"
        x={projection([label.long, label.lat])[0]}
        y={projection([label.long, label.lat])[1]}>{label.name}</text
      ></a
    >
  {/each}
  {#each Object.entries(colorScale) as legendItem, i}
    <g
      class="traffic-light-legend"
      transform={`translate(${width - legendWidth - margins.right}, ${
        margins.top
      })`}
    >
      <rect
        x={0}
        y={(legendHeight / 3) * i}
        width={legendWidth}
        height={legendHeight / 3}
        fill={legendItem[1]}
        stroke="white"
        stroke-width={1}
        stroke-opacity={0.5}
      />
      <text
        x={legendWidth / 2}
        y={(legendHeight / 3) * i + legendHeight / 6}
        dy={4}>{legendItem[0]}</text
      >
      >
    </g>
  {/each}
</svg>

<style>
  svg {
    background-color: "#eeeeee";
  }
  .country {
    stroke: #444444;
    stroke-width: 0.5;
  }
  .country-label {
    fill: white;
    text-anchor: middle;
    font-size: 11px;
    opacity: 0.9;
    text-shadow: -1px -1px black, -1px 1px black, 1px 1px black, 1px -1px black,
      -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
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
  .traffic-light-legend text {
    font-size: 12px;
    text-anchor: middle;
    fill: #ffffff;
    opacity: 0.8;
  }
  /*label {
    position: absolute;
    left: 10px;
    top: 80px;
    z-index: 10;
  }*/
</style>
