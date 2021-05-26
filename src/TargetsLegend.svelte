<script>
  export let width = 0;
  export let height = 0;

  const margins = { top: 10, left: 10, right: 10, bottom: 10 };
  $: legendHeight = height - margins.top - margins.bottom;
</script>

<svg {width} {height}>
  <g class="target-lines">
    <line
      class="target-necp"
      x1={margins.left}
      x2={width - margins.right}
      y1={margins.top + legendHeight / 3}
      y2={margins.top + legendHeight / 3}
    />
    <text
      x={width / 2}
      y={margins.top + legendHeight / 3}
      dy={-4}
      class="target-necp">NECP</text
    >
    <line
      class="target-euco"
      x1={margins.left}
      x2={width - margins.right}
      y1={margins.top + (legendHeight / 3) * 2}
      y2={margins.top + (legendHeight / 3) * 2}
    />
    <text
      x={width / 2}
      y={margins.top + (legendHeight / 3) * 2}
      dy={-4}
      class="target-euco">EUCO</text
    >
    <line
      class="target-2020"
      x1={margins.left}
      x2={width - margins.right}
      y1={margins.top + legendHeight}
      y2={margins.top + legendHeight}
    />
    <text
      x={width / 2}
      y={margins.top + legendHeight}
      dy={-4}
      class="target-2020">2020</text
    >
  </g>
</svg>

<style>
  .target-lines line {
    stroke-width: 1.5;
    stroke-dasharray: 6;
    stroke-linecap: round;
  }
  .target-lines text {
    font-size: 12px;
    text-anchor: middle;
  }
  line.target-necp {
    stroke: purple;
  }
  text.target-necp {
    fill: purple;
  }
  line.target-euco {
    stroke: orange;
  }
  text.target-euco {
    fill: orange;
  }
  line.target-2020 {
    stroke: steelblue;
  }
  text.target-2020 {
    fill: steelblue;
  }
</style>
