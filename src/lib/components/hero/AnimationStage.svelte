<script>
	import { onMount } from 'svelte';

	let { durations, height = 500, onLoop, children } = $props();

	let step = $state(0);
	let timeoutId;

	function startAnimation() {
		clearAnimation();
		step = 0;
		advanceAnimation();
	}

	function advanceAnimation() {
		if (step < durations.length - 1) {
			timeoutId = setTimeout(() => {
				step++;
				advanceAnimation();
			}, durations[step]);
		} else {
			timeoutId = setTimeout(() => {
				onLoop?.();
				startAnimation();
			}, durations[step]);
		}
	}

	function clearAnimation() {
		if (timeoutId) clearTimeout(timeoutId);
	}

	onMount(() => {
		startAnimation();
		return () => clearAnimation();
	});
</script>

<div class="animation-container">
	<div class="animation-stage" style="height: {height}px">
		{@render children(step)}
	</div>
</div>

<style>
	.animation-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	.animation-stage {
		position: relative;
		width: 100%;
		overflow: hidden;
	}
</style>
