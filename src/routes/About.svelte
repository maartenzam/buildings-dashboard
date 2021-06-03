<script>
  import AboutText from "./../data/AboutText.js";
</script>

<div class="container">
  <h2>About this dashboard</h2>
  {#each AboutText as para}
    <p>{@html para}</p>
  {/each}
</div>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto 0 auto;
  }
</style>
