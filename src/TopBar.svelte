<script>
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import { Router, Link } from "svelte-navigator";
</script>

<nav class="top-app-bar-container">
  <TopAppBar variant="static" color="primary" dense>
    <Row>
      <Section>
        <Router>
          <Link to="/">
            <Title>ECF Buildings Dashboard</Title>
          </Link>
        </Router>
      </Section>
      <Section align="end">
        <Router>
          <Link to="about">Go to about</Link>
        </Router>
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
