<script>
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
	import GeoLocallyAnimation from '$lib/components/hero/GeoLocallyAnimation.svelte';

	const oldWay = [
		'Customer Googles "local service near me"',
		'Compares a few links and listings',
		'Calls the business that looks clearest'
	];

	const newWay = [
		'Customer asks a full question in Google, Maps, or another search tool',
		'The result compares businesses using public web and business info',
		'The clearest, most trustworthy option gets more attention'
	];
</script>

<section id="how-ai-works" class="bg-[#030712] text-white py-20">
	<div class="container mx-auto px-4 max-w-5xl">
		<div class="text-center mb-12">
			<SectionLabel>The shift is happening</SectionLabel>
			<h2 class="font-display text-3xl md:text-4xl font-black italic text-white text-balance mb-4">
				Search is getting faster.
			</h2>
			<p class="text-gray-400 text-lg max-w-2xl mx-auto text-pretty">
				People are asking fuller questions and expecting quicker answers. That does not replace
				SEO. It makes clarity matter more.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-6 mb-10">
			<!-- Old way -->
			<div class="bg-slate-900 border border-slate-700 rounded-lg p-7">
				<p class="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-5">
					How search used to work
				</p>
				<div class="flex flex-col gap-3">
					{#each oldWay as step, i}
						<div class="flex items-start gap-3">
							<span
								class="w-6 h-6 rounded-full bg-slate-700 text-gray-400 text-xs flex items-center justify-center flex-shrink-0 font-bold mt-0.5"
							>
								{i + 1}
							</span>
							<p class="text-gray-400 text-sm leading-relaxed">{step}</p>
						</div>
					{/each}
				</div>
				<p class="mt-5 text-xs text-gray-600 border-t border-slate-700 pt-4">
					Local SEO still matters here
				</p>
			</div>

			<!-- New way -->
			<div class="bg-slate-900 border-2 border-indigo-500 rounded-lg p-7">
				<p class="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-5">
					How search works now
				</p>
				<div class="flex flex-col gap-3">
					{#each newWay as step, i}
						<div class="flex items-start gap-3">
							<span
								class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center flex-shrink-0 font-bold mt-0.5"
							>
								{i + 1}
							</span>
							<p class="text-gray-200 text-sm leading-relaxed font-medium">{step}</p>
						</div>
					{/each}
				</div>
				<p class="mt-5 text-xs text-indigo-400 font-semibold border-t border-indigo-500/30 pt-4">
					Clear information matters more in faster search results
				</p>
			</div>
		</div>

		<div class="text-center bg-slate-900 border border-slate-700 rounded-lg py-6 px-8 mb-10">
			<p class="text-base md:text-lg font-bold text-pretty text-white">
				GeoLocally gives your business a clearer front door online: what you do, where you work,
				why people should trust you, and what to do next.
				<span class="text-indigo-400">That matters because unclear businesses get skipped.</span>
			</p>
		</div>

		<div>
			<p class="text-center text-xs font-bold uppercase tracking-[0.22em] text-gray-600 mb-4">
				Watch how the search experience is changing
			</p>
			<div class="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
				<GeoLocallyAnimation />
			</div>
		</div>
	</div>
</section>
