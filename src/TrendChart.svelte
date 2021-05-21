<script>
  import { scaleLinear, scaleTime } from "d3-scale";
  import { extent, min, max } from "d3-array";

  export let countryData;
  export let width;
  export let height;
  export let displayUnits;

  const margins = { top: 10, left: 10, right: 10, bottom: 10 };

  const yAxisMargin = 0.2;

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
</script>

<svg {width} {height}>
  <rect {width} {height} fill={"#1db6c1"} opacity={0.2} />
  <g transform={`translate(${margins.left}, ${margins.top})`}>
    {#each countryDataPoints as point}
      <circle cx={xScale(point.time)} cy={yScale(point[displayUnits])} r={4} />
    {/each}
  </g>
</svg>

<style>
  circle {
    stroke-width: 1.5px;
    stroke: #1db6c1;
    fill: #1db6c1;
    fill-opacity: 0.2;
    stroke-opacity: 1;
  }
</style>
