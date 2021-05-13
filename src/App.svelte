<script>
	import Select, { Option } from '@smui/select';
 	let fruits = ['A failure', 'Meh', 'Great', 'Awesome'];
 	let value = 'Great';
	export let name;
</script>

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