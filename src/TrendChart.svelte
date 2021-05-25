<script>
  import { scaleLinear, scaleTime } from "d3-scale";
  import { extent, min, max } from "d3-array";
  import ChartAxis from "./ChartAxis.svelte";
  import { timeFormat } from "d3-time-format";
  import { format } from "d3-format";
  import { regressionLoess } from "d3-regression";
  import { line } from "d3-shape";

  export let countryData;
  export let width;
  export let height;
  export let displayUnits;

  const margins = { top: 10, left: 30, right: 10, bottom: 10 };

  const yAxisMargin = 0;

  $: countryDataPoints = countryData[1];

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

  $: yTicks = yScale.ticks(3);
  const formatNumber = format(".2s");
</script>

<svg {width} {height}>
  <rect {width} {height} fill={"#1db6c1"} opacity={0.2} />
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
    {#each countryDataPoints as point}
      <circle cx={xScale(point.time)} cy={yScale(point[displayUnits])} r={3} />
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
</style>
