<script>
  import { scaleLinear, scaleTime } from "d3-scale";
  import { extent, min, max } from "d3-array";
  export let countryData = [["", []]];
  export let width;
  export let height;

  const margins = { top: 10, left: 20, right: 10, bottom: 10 };

  const yAxisMargin = 0.2;

  $: austriaData = countryData[0][1];

  $: chartWidth = width - margins.left - margins.right;
  $: chartHeight = height - margins.top - margins.bottom;
  $: xDomain = extent(austriaData, (d) => d.time);
  $: yDomain = extent(austriaData, (d) => d.values).map(
    (d, i) =>
      d -
      (max(austriaData, (d) => d.values) - min(austriaData, (d) => d.values)) *
        -(i - 1) *
        yAxisMargin
  );

  $: xScale = scaleTime().domain(xDomain).range([0, chartWidth]);
  $: yScale = scaleLinear().domain(yDomain).range([chartHeight, 0]);
</script>

<svg {width} {height}>
  <g transform={`translate(${margins.left}, ${margins.top})`}>
    <rect
      width={chartWidth}
      height={chartHeight}
      fill="deeppink"
      opacity={0.1}
    />
    {#each austriaData as point}
      <circle cx={xScale(point.time)} cy={yScale(point.values)} r={5} />
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
