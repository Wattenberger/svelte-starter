<script>
	export let placement = [-50, -100];
</script>

<div
	class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
	style="transform: translate({placement[0]}%, {placement[1]}%) translate(0, -6px)"
>
	<div class="bg-white py-2 px-3 shadow-lg rounded-lg border border-slate-300 z-10">
		<slot name="tooltip" />
	</div>
	<svg
		class="absolute bottom-[1px] left-1/2 transform translate-y-full -translate-x-1/2 w-4 z-20"
		viewBox="-1 0 2 1"
	>
		<path
			d="M -1 0 L 0 1 L 1 0"
			class="text-slate-300 stroke-current fill-white"
			vector-effect="non-scaling-stroke"
		/>
	</svg>
</div>
<slot />
