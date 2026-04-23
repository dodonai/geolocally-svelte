<script>
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
	import testimonials from '$lib/data/testimonials.json';
</script>

<section class="bg-slate-800 text-white py-20">
	<div class="container mx-auto px-4 max-w-5xl">
		<div class="text-center mb-12">
			<SectionLabel>Best Fits</SectionLabel>
			<h2 class="font-display text-3xl md:text-4xl font-black italic text-white text-balance">
				Businesses that usually benefit first.
			</h2>
		</div>

		<div class="grid md:grid-cols-3 gap-6">
			{#each testimonials as t (t.name)}
				<div class="bg-[#030712] border border-slate-700 rounded-lg">
					<div class="p-6 flex flex-col h-full">
						<p class="font-display italic text-gray-200 text-sm leading-relaxed flex-1 mb-5">"{t.quote}"</p>
						<div>
							<p class="font-bold text-indigo-400 text-xs uppercase tracking-wider">{t.name}</p>
							<p class="text-gray-600 text-xs mt-0.5">{t.business}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<p class="text-center text-xs text-gray-600 mt-6">
			These are representative scenarios, not direct customer testimonials.
		</p>
	</div>
</section>
