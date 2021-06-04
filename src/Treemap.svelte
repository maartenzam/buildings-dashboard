<script>
  import { stratify, treemap, treemapSlice } from "d3-hierarchy";
  import { format } from "d3-format";
  import Tooltip, { Wrapper } from "@smui/tooltip";

  export let treemapData = [{ parent: "", country: "", absolute: 0 }];
  export let width = 0;
  export let height = 0;

  $: treemapDataRoot = [
    ...treemapData,
    {
      parent: "",
      country: "root",
      absolute: 0,
    },
  ].filter((d) => d.country !== "EU27_2020");

  $: root = stratify()
    .id((d) => d.country)
    .parentId((d) => d.parent)(treemapDataRoot)
    .sum((d) => d.absolute)
    .sort((a, b) => b.value - a.value);

  $: treemap().size([width, height]).padding(2)(/*.tile(treemapSlice)*/ root);
</script>

<svg {width} {height}>
  {#each root.leaves() as node}
    <Wrapper>
      <rect
        class="node"
        x={node.x0}
        y={node.y0}
        width={node.x1 - node.x0}
        height={node.y1 - node.y0}
      />
      <Tooltip xPos="start" yPos="above"
        >{`${node.id}: ${format(",")(
          Math.round(node.value * 10) / 10
        )}`}</Tooltip
      >
    </Wrapper>
    {#if node.y1 - node.y0 > 12 && node.x1 - node.x0 > 40}
      <text class="treemap-label" x={node.x0 + 2} y={node.y0 + 12}
        >{`${node.id}: ${format(".2s")(
          Math.round(node.value * 10) / 10
        )}`}</text
      >
    {:else if node.y1 - node.y0 > 12 && node.x1 - node.x0 <= 40}
      <text class="treemap-label" x={node.x0 + 2} y={node.y0 + 12}
        >{`${node.id}`}</text
      >
    {/if}
  {/each}
</svg>

<style>
  .node {
    fill: #1db6c1;
  }
  .treemap-label {
    fill: white;
    opacity: 0.8;
    font-size: 11px;
  }
</style>
