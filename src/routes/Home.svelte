<script>
  import Select, { Option } from "@smui/select";

  let fruits = ["A failure", "Meh", "Great", "Awesome"];
  let value = "Great";
  let options = ["Absolute", "Relative"];
  let units = "Absolute";

  let width = "100%";
  let height = "100%";
</script>

<div class="left">
  <svg {width} {height} />
  <div class="select-container">
    <Select bind:value label="This is going to be">
      {#each fruits as fruit}
        <Option value={fruit}>{fruit}</Option>
      {/each}
    </Select>

    <Select bind:value={units} label="Units">
      {#each options as opt}
        <Option value={opt}>{opt}</Option>
      {/each}
    </Select>
  </div>
  <!--pre class="status">Selected: {value}</pre>
    <pre class="status">Selected: {units}</pre-->
</div>
<div class="right">
  <h2>Selected indicator name</h2>
  <p>
    Under construction, by Maarten, and lots and lots more text to see how it
    wraps. And even more text
  </p>
</div>

<style>
  .left {
    border-right: 1px solid #f8f7f7;
    flex: 100000 0 400px;
    position: relative;
    min-height: 500px;
  }
  .right {
    flex: 1 10000 300px;
    padding: 1rem;
    width: 100%;
  }
  .select-container {
    position: absolute;
    left: 1rem;
    top: 0rem;
  }
</style>
