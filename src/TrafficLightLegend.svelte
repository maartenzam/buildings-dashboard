<script>
  export let width = 0;
  export let height = 0;
  export let colorScale;

  const margins = { top: 10, left: 10, right: 10, bottom: 10 };
  $: legendHeight = height - margins.top - margins.bottom;
</script>

<svg {width} {height}>
  {#each Object.entries(colorScale) as legendItem, i}
    <g class="traffic-light-legend">
      <rect
        x={margins.left}
        y={margins.top + (legendHeight / 3) * i}
        width={width - margins.left - margins.right}
        height={legendHeight / 3}
        fill={legendItem[1]}
      />
      <text
        x={width / 2}
        y={margins.top + (legendHeight / 3) * i + legendHeight / 6}
        dy={4}
        class="target-necp">{legendItem[0]}</text
      >
      >
    </g>
  {/each}
</svg>

<style>
  .traffic-light-legend text {
    font-size: 12px;
    text-anchor: middle;
    fill: #ffffff;
    opacity: 0.8;
  }
</style>
