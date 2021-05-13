<script>
  import Select, { Option } from "@smui/select";
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";

  let fruits = ["A failure", "Meh", "Great", "Awesome"];
  let value = "Great";
  export let name;
</script>

<div class="flexy">
  <div class="top-app-bar-container">
    <TopAppBar variant="static" color="secondary" dense>
      <Row>
        <Section>
          <Title>ECF Buildings Dashboard</Title>
        </Section>
        <Section align="end">
          <img src="./logo-ecf@2x.png" alt="ECF logo" height="100%" />
        </Section>
      </Row>
    </TopAppBar>
  </div>

  <main>
    <h1>ECF Buildings dashboard</h1>
    <p>Under construction, by {name}</p>
    <div>
      <Select bind:value label="This is going to be">
        {#each fruits as fruit}
          <Option value={fruit}>{fruit}</Option>
        {/each}
      </Select>

      <pre class="status">Selected: {value}</pre>
    </div>
  </main>
</div>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
