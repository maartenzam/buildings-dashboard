<script>
  import { Route } from "tinro";
  import Home from "./routes/Home.svelte";
  import Map from "./routes/Map.svelte";
  import CountryPage from "./routes/CountryPage.svelte";
  import TopBar from "./TopBar.svelte";
  import Footer from "./Footer.svelte";
</script>

<div class="wrapper">
  <TopBar />
  <main>
    <Route path="/">
      <Home />
    </Route>
    <Route path="/country/:country" let:meta>
      <CountryPage />
    </Route>
    <Route path="/map">
      <Map />
    </Route>
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
