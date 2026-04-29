<script>
	import stats from '$lib/data/stats.json';
</script>

<section class="bg-slate-900 text-white border-y border-slate-700">
	<div class="container mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-700">
		{#each stats as stat (stat.value)}
			<div class="px-6 first:pl-0 last:pr-0 text-center md:text-left">
				<p class="font-display text-2xl font-black italic text-indigo-400 leading-none mb-1.5">{stat.value}</p>
				<p class="text-xs text-gray-500 leading-relaxed">{stat.label}</p>
			</div>
		{/each}
	</div>
</section>
