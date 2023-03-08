<script>
    import ReportText from "../data/ReportText23.js";
  </script>
  
  <div class="container">
    <h2>Report on Buildings Dashboard</h2>
    {#each ReportText as para}
      {@html para}
    {/each}
  </div>
  
  <style>
    .container {
      max-width: 600px;
      margin: 0 auto 0 auto;
    }
  </style>