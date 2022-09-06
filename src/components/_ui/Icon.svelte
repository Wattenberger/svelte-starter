<script>
	import pathsByName from './icon-paths';
	export const iconOptions = Object.keys(pathsByName);
	export const directions = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

	export let name = 'arrow';
	let clazz = '';
	export { clazz as class };
	export let direction = 'n';

	$: paths = pathsByName[name] || [];
	$: rotation = directions.indexOf(direction) * 45;
</script>

<svg
	class="c {clazz}"
	viewBox="0 0 25 25"
	fill-rule="evenodd"
	clip-rule="evenodd"
	style={`transform: rotate(${rotation}deg)`}
>
	{#each paths as path}
		<path d={path} />
	{/each}
</svg>

<style>
	.c {
		width: 1em;
		height: 1em;
		fill: currentColor;
		transition: all 0.3s ease-out;
		overflow: visible;
	}
</style>
