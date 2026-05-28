<script>
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
	import testimonials from '$lib/data/testimonials.json';
</script>

<section class="bg-slate-800 text-white py-20">
	<div class="container mx-auto px-4 max-w-5xl">
		<div class="text-center mb-12">
			<SectionLabel>Best Fits</SectionLabel>
			<h2 class="font-display text-3xl md:text-4xl font-black italic text-white text-balance">
				What different categories need from the page.
			</h2>
			<p class="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
				Common patterns we design around for each kind of local business.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-6">
			{#each testimonials as t (t.name)}
				<div class="bg-[#030712] border border-slate-700 rounded-lg">
					<div class="p-6 flex flex-col h-full">
						<p class="font-bold text-indigo-400 text-xs uppercase tracking-wider mb-1.5">{t.name}</p>
						<p class="text-gray-600 text-xs mb-5">{t.business}</p>
						<p class="text-gray-200 text-sm leading-relaxed flex-1">{t.quote}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
