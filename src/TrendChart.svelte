<script>
  import { scaleLinear, scaleTime } from "d3-scale";
  import { extent, min, max } from "d3-array";
  import ChartAxis from "./ChartAxis.svelte";
  import { timeFormat } from "d3-time-format";
  import { format } from "d3-format";
  import { regressionLoess } from "d3-regression";
  import { line } from "d3-shape";
  import Tooltip, { Wrapper } from "@smui/tooltip";
  import { country } from "./data/DataStore.js";

  export let countryData;
  export let width = 0;
  export let height = 0;
  export let displayUnits;
  export let targetsData;
  export let modal;
  export let selectedIndicator;
  $: console.log(targetsData);

  $: chartConfig = {
    compact: {
      circleRadius: 3,
      lineWidth: 2,
      margins: { top: 10, left: 30, right: 10, bottom: 10 },
      axisLabels: 11,
      yearFormat: timeFormat("%y"),
      numberFormat:
        displayUnits === "sharenobiom" ? format(",") : format(".2s"),
    },
    generous: {
      circleRadius: 6,
      lineWidth: 3,
      margins: { top: 20, left: 70, right: 20, bottom: 40 },
      axisLabels: 14,
      yearFormat: timeFormat("%Y"),
      numberFormat: format(","),
    },
  };

  const yAxisMargin = 0;

  $: countryDataPoints = countryData[1];

  $: chartWidth = width - margins.left - margins.right;
  $: chartHeight = height - margins.top - margins.bottom;

  $: sizing = chartConfig[width > 600 ? "generous" : "compact"];
  $: margins = sizing.margins;

  $: xDomain = extent(countryDataPoints, (d) => d.time);
  $: yDomain = extent(countryDataPoints, (d) => d[displayUnits]).map(
    (d, i) =>
      d -
      (max(countryDataPoints, (d) => d[displayUnits]) -
        min(countryDataPoints, (d) => d[displayUnits])) *
        -(i - 1) *
        yAxisMargin
  );

  $: if (
    targetsData !== undefined &&
    displayUnits === "absolute" &&
    selectedIndicator.indicatorCode === "fec"
  ) {
    yDomain[0] = Math.min(
      yDomain[0],
      targetsData[1][0]["target.necp"] * 1000,
      targetsData[1][0]["target.euco"] * 1000,
      targetsData[1][0]["target.2020"] * 1000
    );
    yDomain[1] = Math.max(
      yDomain[1],
      targetsData[1][0]["target.necp"] * 1000,
      targetsData[1][0]["target.euco"] * 1000,
      targetsData[1][0]["target.2020"] * 1000
    );
  }

  $: if (
    targetsData !== undefined &&
    displayUnits === "absolute" &&
    selectedIndicator.indicatorCode === "fechh"
  ) {
    yDomain[0] = Math.min(yDomain[0], targetsData[1][0]["target.fechh"] * 1000);
    yDomain[1] = Math.max(yDomain[1], targetsData[1][0]["target.fechh"] * 1000);
  }

  $: xScale = scaleTime().domain(xDomain).range([0, chartWidth]);
  $: yScale = scaleLinear().domain(yDomain).range([chartHeight, 0]);

  $: loessRegression = regressionLoess()
    .x((d) => d.time)
    .y((d) => d[displayUnits])
    .bandwidth(0.4);

  $: lineLoess = line()
    .x((d) => xScale(new Date(d[0])))
    .y((d) => yScale(d[1]));

  const xTicks = [
    new Date(2005, 0, 1),
    new Date(2010, 0, 1),
    new Date(2015, 0, 1),
  ];
  const formatFullYear = timeFormat("%Y");

  $: yTicks = yScale.ticks(3);
</script>

<svg
  {width}
  {height}
  on:click={() => {
    country.set(countryData[0]);
    if (modal) {
      modal.show();
    }
  }}
  class={modal ? "clickable" : ""}
>
  <!--rect {width} {height} fill={"#ffffff"} /-->
  <g transform={`translate(${margins.left}, ${margins.top})`}>
    <g class="axis y-axis">
      {#each yTicks as tick}
        <ChartAxis
          axisType="yAxis"
          translate="translate(0, {yScale(tick)})"
          x1={xScale(xDomain[0])}
          x2={xScale(xDomain[1])}
          x={-4}
          y="+4"
          text={sizing.numberFormat(tick)}
          {sizing}
        />
      {/each}
    </g>
    <g class="axis x-axis">
      {#each xTicks as tick}
        <ChartAxis
          axisType="xAxis"
          translate="translate({xScale(tick)},0)"
          y1={yScale(yDomain[0])}
          y2={yScale(yDomain[1])}
          y={height - margins.bottom}
          text={sizing.yearFormat(tick)}
          {sizing}
        />
      {/each}
    </g>
    {#if targetsData !== undefined && displayUnits === "absolute" && selectedIndicator.indicatorCode === "fec"}
      <g class="target-lines">
        <!-- svelte-ignore component-name-lowercase -->
        <line
          class="target-necp"
          x1={xScale(xDomain[0])}
          x2={xScale(xDomain[1])}
          y1={yScale(targetsData[1][0]["target.necp"] * 1000)}
          y2={yScale(targetsData[1][0]["target.necp"] * 1000)}
        />
        <!-- svelte-ignore component-name-lowercase -->
        <line
          class="target-euco"
          x1={xScale(xDomain[0])}
          x2={xScale(xDomain[1])}
          y1={yScale(targetsData[1][0]["target.euco"] * 1000)}
          y2={yScale(targetsData[1][0]["target.euco"] * 1000)}
        />
        <!-- svelte-ignore component-name-lowercase -->
        <line
          class="target-2020"
          x1={xScale(xDomain[0])}
          x2={xScale(xDomain[1])}
          y1={yScale(targetsData[1][0]["target.2020"] * 1000)}
          y2={yScale(targetsData[1][0]["target.2020"] * 1000)}
        />
      </g>
    {/if}
    {#if targetsData !== undefined && displayUnits === "absolute" && selectedIndicator.indicatorCode === "fechh"}
      <g class="target-lines">
        <!-- svelte-ignore component-name-lowercase -->
        <line
          class="target-fechh"
          x1={xScale(xDomain[0])}
          x2={xScale(xDomain[1])}
          y1={yScale(targetsData[1][0]["target.fechh"] * 1000)}
          y2={yScale(targetsData[1][0]["target.fechh"] * 1000)}
        />
      </g>
    {/if}
    {#each countryDataPoints as point}
      <Wrapper>
        <circle
          cx={xScale(point.time)}
          cy={yScale(point[displayUnits])}
          r={sizing.circleRadius}
        />
        <Tooltip
          >{`${formatFullYear(point.time)}: ${
            Math.round(point[displayUnits] * 10) / 10
          }`}</Tooltip
        >
      </Wrapper>
    {/each}
    <path
      class="regression-line"
      d={lineLoess(loessRegression(countryDataPoints))}
      stroke-width={sizing.lineWidth}
    /></g
  >
</svg>

<style>
  svg.clickable:hover {
    cursor: pointer;
  }
  circle {
    stroke-width: 0.5px;
    stroke: #1db6c1;
    fill: #1db6c1;
    fill-opacity: 0.5;
    stroke-opacity: 1;
  }
  circle:hover {
    cursor: pointer;
  }
  .regression-line {
    fill: none;
    stroke: #1db6c1;
    stroke-linecap: round;
  }
  .target-lines line {
    stroke-width: 1.5;
    stroke-dasharray: 6;
    stroke-linecap: round;
  }
  line.target-necp {
    stroke: purple;
  }
  line.target-euco {
    stroke: orange;
  }
  line.target-2020 {
    stroke: steelblue;
  }
  line.target-fechh {
    stroke: red;
  }
</style>
