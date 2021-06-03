<script>
  import GuideText from "./../data/GuideText.js";
</script>

<div class="container">
  <h2>How to use this dashboard</h2>
  {#each GuideText as para}
    <p>{@html para}</p>
  {/each}
</div>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto 0 auto;
  }
</style>
