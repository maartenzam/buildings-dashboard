<script>
  export let countryData = ["", [{ status: null }]];
  export let width;
  export let height;
  export let colorScale;

  const margins = { top: 10, left: 10, right: 10, bottom: 10 };
  $: chartWidth = width - margins.left - margins.right;
  $: chartHeight = height - margins.top - margins.bottom;
</script>

<svg {width} {height}>
  <g transform={`translate(${margins.left}, ${margins.top})`}>
    <rect
      width={chartWidth}
      height={chartHeight}
      fill={colorScale[countryData[1][0].status]}
    />
  </g>
</svg>

<style></style>
