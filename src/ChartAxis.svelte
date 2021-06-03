<script>
  export let axisType = "xAxis";
  export let translate = "translate(0, 0)";
  export let x = 0;
  export let x1 = 0;
  export let x2 = 0;
  export let y = 4;
  export let y1 = 0;
  export let y2 = 0;
  export let text = "";
  export let sizing;
</script>

{#if axisType == "xAxis"}
  <g class="tick" transform={translate}>
    <line {y1} {y2} />
    <text {y} style={`text-anchor:middle; font-size: ${sizing.axisLabels}`}
      >{text}</text
    >
  </g>
{:else}
  <g class="tick" transform={translate}>
    <line {x1} {x2} />
    <text
      x={x - sizing.yAxisOffset}
      {y}
      style={`text-anchor:end; font-size: ${sizing.axisLabels}`}>{text}</text
    >
  </g>
{/if}

<style>
  .tick line {
    stroke: #a3a3a3;
    stroke-width: 1;
    stroke-dasharray: 0;
    opacity: 0.2;
  }

  .tick text {
    fill: #a3a3a3;
    font-size: 11px;
  }
</style>
