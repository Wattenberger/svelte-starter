<script lang="ts">
	import { tweened } from 'svelte/motion';
	export let value = 0;
	export let duration = 1000;
	export let format = (value: any) => {
		if (typeof value !== 'number') return '-';
		if (Number.isNaN(value)) return '-';
		return new Intl.NumberFormat('en-US', {
			maximumFractionDigits: 2
		}).format(value);
	};

	let cachedValue = tweened(value, { duration });

	$: cachedValue.set(value);
</script>

{format($cachedValue)}
