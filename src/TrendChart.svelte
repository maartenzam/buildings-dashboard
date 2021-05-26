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
  /*import { tweened } from "svelte/motion";
  import * as easings from "svelte/easing";*/

  export let countryData;
  export let width = 0;
  export let height = 0;
  export let displayUnits;
  export let targetsData;
  export let modal;

  const margins = { top: 10, left: 30, right: 10, bottom: 10 };

  const yAxisMargin = 0;

  $: countryDataPoints = countryData[1];

  /*$: tweenedPoints = tweened(countryDataPoints, {
    delay: 0,
    duration: 750,
    easing: easings.cubicOut,
  });

  $: tweenedPoints.set(countryDataPoints);*/

  $: chartWidth = width - margins.left - margins.right;
  $: chartHeight = height - margins.top - margins.bottom;

  $: xDomain = extent(countryDataPoints, (d) => d.time);
  $: yDomain = extent(countryDataPoints, (d) => d[displayUnits]).map(
    (d, i) =>
      d -
      (max(countryDataPoints, (d) => d[displayUnits]) -
        min(countryDataPoints, (d) => d[displayUnits])) *
        -(i - 1) *
        yAxisMargin
  );

  $: if (targetsData !== undefined && displayUnits === "absolute") {
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

  $: xScale = scaleTime().domain(xDomain).range([0, chartWidth]);
  $: yScale = scaleLinear().domain(yDomain).range([chartHeight, 0]);

  $: loessRegression = regressionLoess()
    .x((d) => d.time)
    .y((d) => d[displayUnits])
    .bandwidth(0.4);

  $: lineLoess = line()
    .x((d) => xScale(new Date(d[0])))
    .y((d) => yScale(d[1]));

  const xTicks = [new Date(2005, 1), new Date(2010, 1), new Date(2015, 1)];
  const formatTime = timeFormat("%y");
  const formatFullYear = timeFormat("%Y");

  $: yTicks = yScale.ticks(3);
  const formatNumber = format(".2s");
</script>

<svg
  {width}
  {height}
  on:click={() => {
    country.set(countryData[0]);
    modal.show();
  }}
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
          text={formatNumber(tick)}
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
          text={formatTime(tick)}
        />
      {/each}
    </g>
    {#if targetsData !== undefined && displayUnits === "absolute"}
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
    {#each countryDataPoints as point}
      <Wrapper>
        <circle
          cx={xScale(point.time)}
          cy={yScale(point[displayUnits])}
          r={3}
        />
        <Tooltip
          >{`${formatFullYear(point.time)}: ${point[displayUnits]}`}</Tooltip
        >
      </Wrapper>
    {/each}
    <path
      class="regression-line"
      d={lineLoess(loessRegression(countryDataPoints))}
    /></g
  >
</svg>

<style>
  circle {
    stroke-width: 0.5px;
    stroke: #1db6c1;
    fill: #1db6c1;
    fill-opacity: 0.5;
    stroke-opacity: 1;
  }
  .regression-line {
    fill: none;
    stroke: #1db6c1;
    stroke-width: 2;
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
</style>
