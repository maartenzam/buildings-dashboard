<script>
  export let width = 2;
  export let height = 0;
  export let selectedIndicator;

  const margins = { top: 20, left: 10, right: 10, bottom: 10 };
  $: legendHeight = height - margins.top - margins.bottom;
</script>

<svg width={width - 2} {height}>
  <rect {width} {height} class="background" />
  <g class="target-lines">
    {#if selectedIndicator.indicatorCode === "fec"}
      <g transform="translate(0,0)">
        <line
          class="target-2020"
          x1={margins.left}
          x2={width - margins.right}
          y1={margins.top}
          y2={margins.top}
        />
        <text x={width / 2} y={margins.top} dy={-4} class="target-2020"
          >2020 target</text
        >
      </g>
      <g transform={`translate(0,${height / 2 + 4})`}>
        <line
          class="target-necp"
          x1={margins.left}
          x2={width - margins.right}
          y1={0}
          y2={0}
        />
        <text x={width / 2} y={0} dy={-4} class="target-necp"
          >2030 national</text
        >
        <text x={width / 2} y={0} dy={11} class="target-necp">contribution</text
        >
      </g>
      <g transform={`translate(0,${height - margins.bottom})`}>
        <line
          class="target-euco"
          x1={margins.left}
          x2={width - margins.right}
          y1={0}
          y2={0}
        />
        <text x={width / 2} y={0} dy={-4} class="target-euco"
          >2030 EU projection</text
        >
      </g>
    {/if}
    {#if selectedIndicator.indicatorCode === "fechh"}
      <g transform={`translate(0,${height - margins.bottom})`}>
        <line
          class="target-euco"
          x1={margins.left}
          x2={width - margins.right}
          y1={0}
          y2={0}
        />
        <text x={width / 2} y={0} dy={-4} class="target-euco"
          >2030 EU projection</text
        >
      </g>
    {/if}
  </g>
</svg>

<style>
  .background {
    fill: #ffffff;
  }
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
