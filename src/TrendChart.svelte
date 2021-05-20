<script>
  import { scaleLinear, scaleTime } from "d3-scale";
  import { extent, min, max } from "d3-array";

  export let countryData;
  export let width;
  export let height;
  export let displayUnits;

  $: console.log(displayUnits);

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
  <g transform={`translate(${margins.left}, ${margins.top})`}>
    {#each countryDataPoints as point}
      <circle cx={xScale(point.time)} cy={yScale(point[displayUnits])} r={5} />
    {/each}
  </g>
</svg>

<style>
  circle {
    stroke-width: 1.5px;
    stroke: black;
    fill-opacity: 0.2;
    stroke-opacity: 1;
  }
</style>
