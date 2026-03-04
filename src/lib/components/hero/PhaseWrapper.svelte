<script>
	import { fade } from 'svelte/transition';
	import PhaseCaption from './PhaseCaption.svelte';

	let { caption = '', subcaption = '', children } = $props();
</script>

<div class="phase-container" in:fade>
	{@render children()}
	{#if caption}
		<PhaseCaption {caption} {subcaption} />
	{/if}
</div>

<style>
	.phase-container {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
</style>
