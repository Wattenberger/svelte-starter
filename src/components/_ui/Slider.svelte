<script>
	export let label = '';
	export let min = 0;
	export let max = 100;
	export let value = 0;
	export let step = 1;

	let inputValue = 0;
	$: value, (inputValue = value);
</script>

<div class="wrapper w-full max-w-[30em] relative">
	<div class="w-full mb-2 flex items-center justify-between px-2">
		<label class="flex-1 font-semibold">
			{label}
		</label>
		<div class="flex-none">
			<input
				class="font-mono"
				type="number"
				bind:value={inputValue}
				style="max-width: {(value + '').length + 5}ch"
				on:input={(e) => {
					const isBetween = inputValue >= min && inputValue <= max;
					if (isBetween) value = inputValue;
				}}
				on:blur={(e) => {
					inputValue = Math.min(max, Math.max(min, inputValue));
					value = inputValue;
				}}
			/>
		</div>
	</div>
	<input type="range" bind:value {min} {max} {step} />
</div>

<style>
	input[type='range'] {
		appearance: none;
		@apply bg-slate-200;
		@apply border-none;
		@apply cursor-pointer;
		@apply h-3;
		@apply rounded-full;
		@apply w-full;
		@apply focus:outline-none;
	}
	input[type='range']::-webkit-slider-thumb {
		appearance: none;
		@apply bg-primary;
		@apply cursor-grab;
		@apply h-6;
		@apply rounded-full;
		@apply w-6;
	}
	input[type='range']:focus::-webkit-slider-thumb {
		@apply ring-2;
		@apply ring-offset-2;
		@apply ring-primary-dark;
	}
</style>
