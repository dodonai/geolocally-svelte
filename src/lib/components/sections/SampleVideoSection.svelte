<script>
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
	import StorefrontDemoAnimation from '$lib/components/hero/StorefrontDemoAnimation.svelte';

	const tags = ['Clear script', 'Natural voiceover', 'On-brand visuals', 'Social-ready exports'];
</script>

<section id="sample-video" class="bg-[#030712] text-white py-20">
	<div class="container mx-auto px-4 max-w-3xl text-center">
		<SectionLabel>See it in action</SectionLabel>
		<h2 class="font-display text-3xl md:text-4xl font-black italic text-white text-balance mb-4">
			Here's what a GeoLocally storefront looks like.
		</h2>
		<p class="text-gray-400 text-lg mb-10 text-pretty">
			A landing page, explainer video, structured data, and analytics — all built for you.
		</p>

		<div class="relative w-full bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-2xl mb-6 py-6">
			<StorefrontDemoAnimation />
		</div>

		<div class="flex flex-wrap justify-center gap-3">
			{#each tags as tag (tag)}
				<span
					class="bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 rounded-full px-4 py-1.5 text-sm font-medium"
				>
					{tag}
				</span>
			{/each}
		</div>
	</div>
</section>
