<script>
  import { geoAzimuthalEqualArea, geoPath } from "d3-geo";
  import { scaleSqrt } from "d3-scale";
  import { onMount } from "svelte";
  import { feature } from "topojson";
  import {
    centroidsDataSet,
    gasGridDataSet,
    credibilityDataSet,
    ambitionDataSet
  } from "./data/DataStore.js";
  import Tooltip, { Wrapper, Content } from "@smui/tooltip";

  export let selectedIndicator;
  export let displayUnits;

  export let width = 0;
  export let height = 0;

  $: mapData =
    selectedIndicator.indicatorCode === "gasban"
      ? $gasGridDataSet.table
      : selectedIndicator.indicatorCode === "credibility"
        ? $credibilityDataSet.table
        : $ambitionDataSet.table

  const trafficLightColors = ["#387E90", "#F5B944", "#E34C27"];
  const policyColors = ["#4f927b", "#1dc38c", "#AAAAAA"];
  const ambitionColors = ["#E34C27", "#F5B944", "#A3C1E3", "#4f927b"]

  const colorScales = {
    gasban: {
      adopted: policyColors[0],
      prepared: policyColors[1],
      "no policy": policyColors[2],
    },
    credibility: {
      "submitted / assessed": trafficLightColors[0],
      "submitted / not yet assessed": trafficLightColors[1],
      "not submitted": trafficLightColors[2],
    },
    ambitionNECP: {
      sufficient: ambitionColors[3],
      modest: ambitionColors[2],
      low: ambitionColors[1],
      "very low": ambitionColors[0],
    },
    ambitionRecast: {
      "more ambition": ambitionColors[3],
      "no position": policyColors[2],
      "less ambition": ambitionColors[0]
    }
  };

  $: colorScale = selectedIndicator.indicatorCode == "gasban" || selectedIndicator.indicatorCode == "credibility" 
    ? colorScales[selectedIndicator.indicatorCode]
    : displayUnits == "ee.fec.necp"
      ? colorScales["ambitionNECP"]
      : colorScales["ambitionRecast"]

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

  const margins = { top: 10, left: 0, right: 10, bottom: 0 };
  const legendHeight = 100 - margins.top - margins.bottom;
  const legendWidth = 200;
</script>

<svg {width} {height}>
  <rect {width} {height} class="sea" />
  {#each data as feature}
    <Wrapper>
      <path
        d={path(feature)}
        class="country"
        fill={mapData.find((d) => d.name === feature.properties.name) && selectedIndicator.indicatorCode != "ambition"
          ? colorScale[
              mapData.find((d) => d.name === feature.properties.name)[
                displayUnits + ".status"
              ]
            ]
          : mapData.find((d) => d.name === feature.properties.name) && selectedIndicator.indicatorCode == "ambition"
            ? colorScale[
              mapData.find((d) => d.name === feature.properties.name)[displayUnits]
            ]
            : "#ffffff"}
      />
      {#if selectedIndicator.indicatorCode === "gasban" && mapData.find((d) => d.name === feature.properties.name) !== undefined}
        <Tooltip rich
          ><Content
            >{@html `<b>${feature.properties.name}</b><br />
            <b>${
              displayUnits == "oil.existing" || displayUnits == "gas.existing"
                ? "Existing buildings"
                : "New buildings"
            } - ${
              displayUnits == "oil.existing" || displayUnits == "oil.new"
                ? "oil"
                : "gas"
            }</b><br />
                ${
                  mapData.find((d) => d.name === feature.properties.name)[
                    displayUnits
                  ]
                }<br />
                  <b>Reference: </b>${
                    mapData.find((d) => d.name === feature.properties.name)[
                      displayUnits + ".reference"
                    ] === "No policy"
                      ? "-"
                      : mapData.find((d) => d.name === feature.properties.name)[
                          displayUnits + ".reference"
                        ]
                  }`}
          </Content>
        </Tooltip>
      {/if}
    </Wrapper>
  {/each}

  {#each $centroidsDataSet.table as label}
    <Wrapper>
      <a href={`/country/${label.code}`}>
        <text
          class="country-label"
          x={projection([label.long, label.lat])[0]}
          y={projection([label.long, label.lat])[1]}>{label.name}</text
        ></a
      >
      {#if selectedIndicator.indicatorCode === "gasban" && mapData.find((d) => d.geo === label.code) !== undefined}
        <Tooltip rich
          ><Content
            >{@html `<b>${label.name}</b><br />
        <b>${
          displayUnits == "oil.existing" || displayUnits == "gas.existing"
            ? "Existing buildings"
            : "New buildings"
        } - ${
              displayUnits == "oil.existing" || displayUnits == "oil.new"
                ? "oil"
                : "gas"
            }</b><br />
            ${mapData.find((d) => d.geo === label.code)[displayUnits]}<br />
              <b>Reference: </b>${
                mapData.find((d) => d.geo === label.code)[
                  displayUnits + ".reference"
                ] === "No policy"
                  ? "-"
                  : mapData.find((d) => d.geo === label.code)[
                      displayUnits + ".reference"
                    ]
              }`}
          </Content>
        </Tooltip>
      {/if}
    </Wrapper>
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
    stroke: #eeeeee;
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
  .traffic-light-legend text {
    font-size: 12px;
    text-anchor: middle;
    fill: #ffffff;
    opacity: 0.95;
  }
</style>
