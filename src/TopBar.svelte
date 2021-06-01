<script>
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
</script>

<nav class="top-app-bar-container">
  <TopAppBar variant="static" color="primary" dense>
    <Row>
      <Section>
        <a href="/">
          <Title>ECF Buildings Dashboard</Title>
        </a>
      </Section>
      <Section align="end">
        <a
          href="/ECF-buildings-dashboard-data-2021-06-01.xlsx"
          tinro-ignore
          download
          style={"color: white; margin-right: 12px;"}>Download data</a
        >
        <img src="./ecf-logo-white.png" alt="ECF logo" height="100%" />
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
