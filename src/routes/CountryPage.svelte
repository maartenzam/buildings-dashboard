<script>
  import { meta } from "tinro";
  const route = meta();
</script>

<div class="wrapper">
  <div class="row">
    <div class="cell">Country: {route.params.country}</div>
    <div class="cell">Test</div>
    <div class="cell">Test</div>
  </div>
  <div class="row">
    <div class="cell">Test</div>
    <div class="cell">Test</div>
    <div class="cell">Test</div>
  </div>
</div>

<style>
  .wrapper {
    flex: 1;
  }
  .row {
    display: flex;
    height: 50%;
    flex-wrap: wrap;
  }
  .cell {
    flex: 1;
    background-color: "salmon";
    min-width: 300px;
  }

  @media (max-width: 900px) {
    .row {
      display: block;
    }
    .cell {
      width: 100%;
      margin: 0 0 10px 0;
    }
  }
</style>
