<script>
  import AboutText from "./../data/AboutText.js";
</script>

<div class="container">
  {#each AboutText as para}
    <p>{@html para}</p>
  {/each}
</div>
