<script>
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
</script>

<nav class="top-app-bar-container">
  <TopAppBar variant="static" color="primary" dense>
    <Row>
      <Section>
        <Title>ECF Buildings Dashboard</Title>
      </Section>
      <Section align="end">
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
