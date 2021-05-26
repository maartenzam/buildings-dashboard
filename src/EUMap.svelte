<script>
  import { geoAlbers, geoAzimuthalEqualArea, geoPath } from "d3-geo";
  import { scaleLinear } from "d3-scale";
  import { extent } from "d3-array";
  import { onMount } from "svelte";
  import { feature } from "topojson";
  import { centroidsDataSet } from "./data/DataStore.js";
  import { bubble } from "svelte/internal";
  $: console.log($centroidsDataSet.table);

  let data = [];
  let colorScale = () => {};
  const width = 960;
  const height = 500;
  /*const projectionAlbers = geoAlbers()
    .rotate([4.4, 0.8])
    .center([0, 55.4])
    .parallels([50, 60])
    .scale(3800)
    .translate([width / 2, (1.8 * height) / 2]);*/

  let mapExtent = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-30, 70],
          [35, 70],
          [35, 30],
          [-30, 30],
        ],
      ],
    },
  };

  const projection = geoAzimuthalEqualArea().rotate([-10, -52, 0]);

  const mapPadding = 20;
  projection.fitExtent(
    [
      [mapPadding, mapPadding],
      [width - mapPadding, height - mapPadding],
    ],
    mapExtent
  );

  let currentProj = projection;
  let path = geoPath().projection(currentProj);

  onMount(async function () {
    const response = await fetch(
      //"https://gist.githubusercontent.com/rveciana/27272a581e975835aaa321ddf816d726/raw/c40062a328843322208b8e98c2104dc8f6ad5301/uk-counties.json"
      "/data/countries-50m.json"
    );
    const json = await response.json();
    //const topoData = feature(json, json.objects.continent_Europe_subunits);
    const topoData = feature(json, json.objects.countries);
    const land = {
      ...topoData,
      features: topoData.features /*.filter(
        (d) => d.properties.type === "Sovereigncountry"
      ),*/,
    };

    /*const namesExtent = extent(
      land.features,
      (d) => d.properties.NAME_2.length
    );
    colorScale = scaleLinear()
      .domain(namesExtent)
      .range(["#feedde", "#fd8d3c"]);*/
    data = land.features;
  });
</script>

<svg width="960" height="500">
  {#each data as feature}
    <path d={path(feature)} class="provinceShape" fill={"#cccccc"} />
  {/each}
  {#each $centroidsDataSet.table as bubble}
    <circle
      cx={projection([bubble.long, bubble.lat])[0]}
      cy={projection([bubble.long, bubble.lat])[1]}
      r={20}
    />
  {/each}
</svg>

<style>
  svg {
    width: 960px;
    height: 500px;
    background-color: "#eeeeee";
  }
  .provinceShape {
    stroke: #444444;
    stroke-width: 0.5;
  }
</style>
