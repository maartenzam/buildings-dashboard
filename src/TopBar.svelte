<script>
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  let windowWidth;
</script>

<svelte:window bind:innerWidth={windowWidth} />
<nav class="top-app-bar-container">
  <TopAppBar variant="static" color="primary" dense>
    <Row>
      <Section>
        {#if windowWidth > 900}
          <a href="/">
            <Title
              >Dashboard on progress of Europe's buildings towards climate
              neutrality</Title
            >
          </a>
        {/if}
      </Section>
      <Section align="end">
        <a href="/report" style={"color: white; margin-right: 12px;"}>Report 2022</a>
        <a href="/about" style={"color: white; margin-right: 12px;"}>About</a>
        <!--img src="./ecf-logo-white.png" alt="ECF logo" height="100%" /-->
      </Section>
    </Row>
  </TopAppBar>
</nav>

<style>
  .top-app-bar-container {
    width: 100%;
    display: inline-flex;
    flex-direction: column;
  }
</style>
