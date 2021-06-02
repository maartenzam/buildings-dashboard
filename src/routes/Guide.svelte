<script>
  import GuideText from "./../data/GuideText.js";
</script>

<div class="container">
  {#each GuideText as para}
    <p>{@html para}</p>
  {/each}
</div>
