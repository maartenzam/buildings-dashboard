<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./routes/Home.svelte";
  import TopBar from "./TopBar.svelte";
  import Footer from "./Footer.svelte";
</script>

<div class="wrapper">
  <TopBar />
  <main>
    <Home />
  </main>
  <Footer />
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    display: flex;
    flex-wrap: wrap-reverse;
    flex: 1;
    padding: 0;
    margin: 0 auto;
    width: 100%;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
