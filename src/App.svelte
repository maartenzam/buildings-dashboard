<script>
  import Select, { Option } from "@smui/select";
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";

  let fruits = ["A failure", "Meh", "Great", "Awesome"];
  let value = "Great";
  let options = ["Absolute", "Relative"];
  let units = "Absolute";
  export let name;
</script>

<div class="wrapper">
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

  <main>
    <div class="left">
      <div class="select-container">
        <Select bind:value label="This is going to be">
          {#each fruits as fruit}
            <Option value={fruit}>{fruit}</Option>
          {/each}
        </Select>

        <Select bind:value={units} label="Units">
          {#each options as opt}
            <Option value={opt}>{opt}</Option>
          {/each}
        </Select>
      </div>
      <pre class="status">Selected: {value}</pre>
      <pre class="status">Selected: {units}</pre>
    </div>
    <div class="right">
      <p>Under construction, by {name}</p>
    </div>
  </main>

  <footer>Footer</footer>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .top-app-bar-container {
    width: 100%;
    display: inline-flex;
    flex-direction: column;
  }
  main {
    display: flex;
    flex: 1;
    padding: 0;
    margin: 0 auto;
    width: 100%;
  }

  .left {
    border-right: 1px solid #f8f7f7;
    flex: 7;
    padding: 2rem;
  }
  .right {
    flex: 3;
    padding: 2rem;
  }
  footer {
    width: 100%;
    height: 30px;
    background-color: #f8f7f7;
    text-align: center;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
