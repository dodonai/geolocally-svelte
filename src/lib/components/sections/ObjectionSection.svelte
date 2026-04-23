<script>
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
	import objections from '$lib/data/objections.json';
</script>

<section class="bg-[#030712] text-white py-20">
	<div class="container mx-auto px-4 max-w-3xl">
		<div class="text-center mb-12">
			<SectionLabel>Straight answers</SectionLabel>
			<h2 class="font-display text-3xl md:text-4xl font-black italic text-white text-balance">
				Honest answers to your real questions.
			</h2>
		</div>

		<div class="grid md:grid-cols-2 gap-6">
			{#each objections as card (card.title)}
				<div class="bg-slate-900 border border-slate-700 rounded-lg">
					<div class="p-6">
						<h3 class="font-bold text-white text-base mb-3">{card.title}</h3>
						<p class="text-gray-400 text-sm leading-relaxed">{card.body}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
