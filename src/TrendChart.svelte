<script>
  import { scaleLinear, scaleTime } from "d3-scale";
  import { extent } from "d3-array";
  import { timeYear } from "d3-time";
  import ChartAxis from "./ChartAxis.svelte";
  import { timeFormat } from "d3-time-format";
  import { format } from "d3-format";
  import { regressionLoess } from "d3-regression";
  import { line } from "d3-shape";
  import Tooltip, { Wrapper } from "@smui/tooltip";
  import { country, countryDataSet } from "./data/DataStore.js";

  export let countryData;
  export let width = 0;
  export let height = 0;
  export let displayUnits;
  export let targetsData;
  export let modal;
  export let selectedIndicator;
  export let yDomain = [0, 1];
  export let freeScales;
  export let shown;

  $: countryName = $countryDataSet.table.find((d) => d.code === $country).name;

  const formatBigNumber = (x) => {
    if (x < 1) {
      return x;
    }
    if (x >= 1) {
      return format(".2s")(x);
    }
  };

  // Responsive settings
  $: chartConfig = {
    compact: {
      circleRadius: 2,
      lineWidth: 2,
      margins: { top: 10, left: 30, right: 10, bottom: 14 },
      axisLabels: 11,
      yAxisOffset: 0,
      yearFormat: timeFormat("%y"),
      numberFormat:
        displayUnits === "sharenobiom"
          ? format(",")
          : formatBigNumber /*format(".2s")*/,
    },
    generous: {
      circleRadius: 6,
      lineWidth: 3,
      margins: { top: 20, left: 40, right: 20, bottom: 40 },
      axisLabels: 16,
      yAxisOffset: 6,
      yearFormat: timeFormat("%Y"),
      numberFormat: format(","),
    },
    inModal: {
      circleRadius: 6,
      lineWidth: 3,
      margins: { top: 80, left: 40, right: 20, bottom: 40 },
      axisLabels: 16,
      yAxisOffset: 6,
      yearFormat: timeFormat("%Y"),
      numberFormat: format(","),
    },
  };

  $: countryDataPoints = countryData[1];

  $: chartWidth = width - margins.left - margins.right;
  $: chartHeight = height - margins.top - margins.bottom;

  let size = width > 600 ? "generous" : "compact";
  size = shown ? "inModal" : size;

  $: sizing = chartConfig[size];
  $: margins = sizing.margins;

  $: xDomain = extent(countryDataPoints, (d) => d.time);
  $: yChartDomain = freeScales
    ? extent(countryDataPoints, (d) => d[displayUnits])
    : yDomain;

  $: if (
    targetsData !== undefined &&
    displayUnits === "absolute" &&
    selectedIndicator.indicatorCode === "fec"
  ) {
    yChartDomain[0] = Math.min(
      yChartDomain[0],
      targetsData[1][0]["target.necp"],
      targetsData[1][0]["target.euco"],
      targetsData[1][0]["target.2020"]
    );
    yChartDomain[1] = Math.max(
      yChartDomain[1],
      targetsData[1][0]["target.necp"],
      targetsData[1][0]["target.euco"],
      targetsData[1][0]["target.2020"]
    );
  }

  $: if (
    targetsData !== undefined &&
    displayUnits === "absolute" &&
    selectedIndicator.indicatorCode === "fechh"
  ) {
    yChartDomain[0] = Math.min(
      yChartDomain[0],
      targetsData[1][0]["target.fechh"]
    );
    yChartDomain[1] = Math.max(
      yChartDomain[1],
      targetsData[1][0]["target.fechh"]
    );
  }

  $: xScale = scaleTime().domain(xDomain).range([0, chartWidth]);
  $: yScale = scaleLinear().domain(yChartDomain).range([chartHeight, 0]);

  $: loessRegression = regressionLoess()
    .x((d) => d.time)
    .y((d) => d[displayUnits])
    .bandwidth(0.3);

  $: lineLoess = line()
    .x((d) => xScale(new Date(d[0])))
    .y((d) => yScale(d[1]));

  $: intermediateXTicks = scaleTime().domain(xDomain).ticks(timeYear.every(5))
  // Remove 2020 from the x axis to avoid overlap with 2021 tick label
  $: if(xDomain[1].getFullYear() == 2021){
      intermediateXTicks = intermediateXTicks.slice(0, intermediateXTicks.length - 1)
    }
  $: xTicks = xDomain.concat(intermediateXTicks);

  const formatFullYear = timeFormat("%Y");

  $: yTicks = yScale.ticks(3);
</script>

<svg
  {width}
  {height}
  on:click={() => {
    country.set(countryData[0]);
    if (modal) {
      modal.show();
    }
  }}
  class={modal ? "clickable" : ""}
  id={shown ? "downloadable" : ""}
>
  <!--rect {width} {height} fill={"#ffffff"} /-->
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
          text={sizing.numberFormat(tick)}
          {sizing}
        />
      {/each}
    </g>
    <g class="axis x-axis">
      {#each xTicks as tick}
        <ChartAxis
          axisType="xAxis"
          translate="translate({xScale(tick)},0)"
          y1={yScale(yChartDomain[0])}
          y2={yScale(yChartDomain[1])}
          y={chartHeight + sizing.axisLabels}
          text={sizing.yearFormat(tick)}
          {sizing}
        />
      {/each}
    </g>
    <g class="target-lines">
      {#if targetsData !== undefined && displayUnits === "absolute" && selectedIndicator.indicatorCode === "fec"}
        <!-- svelte-ignore component-name-lowercase -->
        <line
          class="target-euco"
          x1={xScale(xDomain[0])}
          x2={xScale(xDomain[1])}
          y1={yScale(targetsData[1][0]["target.euco"])}
          y2={yScale(targetsData[1][0]["target.euco"])}
        />
        {#if width > 600}
          <text
            x={xScale(xDomain[0]) + 4}
            y={yScale(targetsData[1][0]["target.euco"]) - 6}
            class="target-euco">2030 EU projection</text
          >
        {/if}
        <!-- svelte-ignore component-name-lowercase -->
        <line
          class="target-necp"
          x1={xScale(xDomain[0])}
          x2={xScale(xDomain[1])}
          y1={yScale(targetsData[1][0]["target.necp"])}
          y2={yScale(targetsData[1][0]["target.necp"])}
        />
        {#if width > 600}
          <text
            x={xScale(xDomain[0]) + 4}
            y={yScale(targetsData[1][0]["target.necp"]) - 6}
            class="target-necp">2030 national contribution</text
          >
        {/if}
        <!-- svelte-ignore component-name-lowercase -->
        <line
          class="target-2020"
          x1={xScale(xDomain[0])}
          x2={xScale(xDomain[1])}
          y1={yScale(targetsData[1][0]["target.2020"])}
          y2={yScale(targetsData[1][0]["target.2020"])}
        />
        {#if width > 600}
          <text
            x={xScale(xDomain[0]) + 4}
            y={yScale(targetsData[1][0]["target.2020"]) - 6}
            class="target-2020">2020 target</text
          >
        {/if}
      {/if}
      {#if targetsData !== undefined && displayUnits === "absolute" && selectedIndicator.indicatorCode === "fechh"}
        <!-- svelte-ignore component-name-lowercase -->
        <line
          class="target-euco"
          x1={xScale(xDomain[0])}
          x2={xScale(xDomain[1])}
          y1={yScale(targetsData[1][0]["target.fechh"])}
          y2={yScale(targetsData[1][0]["target.fechh"])}
        />
        {#if width > 600}
          <text
            x={xScale(xDomain[0]) + 4}
            y={yScale(targetsData[1][0]["target.fechh"]) - 6}
            class="target-euco">2030 EU projection</text
          >
        {/if}
      {/if}
    </g>

    {#each countryDataPoints as point}
      <Wrapper>
        <circle
          cx={xScale(point.time)}
          cy={yScale(point[displayUnits])}
          r={sizing.circleRadius}
        />
        <Tooltip
          >{`${formatFullYear(point.time)}: ${
            Math.round(point[displayUnits] * 10) / 10
          }`}</Tooltip
        >
      </Wrapper>
    {/each}
    <path
      class="regression-line"
      d={lineLoess(loessRegression(countryDataPoints))}
      stroke-width={sizing.lineWidth}
    /></g
  >
  {#if shown}
    <text
      x={margins.left}
      y={20}
      text-anchor={"start"}
      font-size={"22px"}
      font-weight={"bold"}
      >{`${countryName}, ${selectedIndicator.indicatorName}`}</text
    >
    <text x={margins.left} y={48} text-anchor={"start"} font-size={"16px"}
      >{`${
        selectedIndicator.indicatorUnits.find(
          (d) => d.unitsCode === displayUnits
        ).unitsName
      } (${
        selectedIndicator.indicatorUnits.find(
          (d) => d.unitsCode === displayUnits
        ).unitsShort
      })`}</text
    >
  {/if}
</svg>

<style>
  svg.clickable:hover {
    cursor: pointer;
  }
  circle {
    stroke-width: 0.5px;
    /*stroke: #1db6c1;
    fill: #1db6c1;*/
    stroke: #1dc38c;
    fill: #1dc38c;
    fill-opacity: 0.5;
    stroke-opacity: 1;
  }
  circle:hover {
    cursor: pointer;
  }
  .regression-line {
    fill: none;
    /*stroke: #1db6c1;*/
    stroke: #1dc38c;
    stroke-linecap: round;
  }
  .target-lines line {
    stroke-width: 1.5;
    stroke-dasharray: 6;
    stroke-linecap: round;
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
