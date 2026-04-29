<script>
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
	import FinalCTASection from '$lib/components/sections/FinalCTASection.svelte';

	let { page } = $props();

	function getUrl() {
		return `https://geolocally.com/${page.slug}`;
	}

	function getSchema() {
		return {
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'WebPage',
					name: page.heroTitle,
					description: page.description,
					url: getUrl()
				},
				{
					'@type': 'FAQPage',
					mainEntity: page.faqs.map((faq) => ({
						'@type': 'Question',
						name: faq.question,
						acceptedAnswer: {
							'@type': 'Answer',
							text: faq.answer
						}
					}))
				}
			]
		};
	}
</script>

<svelte:head>
	<title>{page.title}</title>
	<meta name="description" content={page.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={getUrl()} />
	<meta property="og:title" content={page.title} />
	<meta property="og:description" content={page.description} />
	<meta property="og:image" content="https://geolocally.com/og-image.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={page.title} />
	<meta name="twitter:description" content={page.description} />
	<meta name="twitter:image" content="https://geolocally.com/og-image.png" />
	<link rel="canonical" href={getUrl()} />
	{@html `<script type="application/ld+json">${JSON.stringify(getSchema())}</script>`}
</svelte:head>

<section class="bg-gray-900 text-white">
	<div class="container mx-auto max-w-6xl px-4 py-20 md:py-24">
		<div class="max-w-4xl">
			<SectionLabel>{page.locationLabel}</SectionLabel>
			<h1 class="font-display text-4xl md:text-6xl font-black italic leading-tight text-balance mb-6">
				{page.heroTitle}
			</h1>
			<p class="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mb-10">
				{page.heroBody}
			</p>
			<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{#each page.heroBullets as bullet (bullet)}
					<div class="rounded-lg border border-slate-700 bg-slate-800/70 px-4 py-4 text-sm text-gray-200">
						<div class="flex items-start gap-2">
							<span class="text-indigo-400 flex-shrink-0 mt-0.5 font-bold leading-none">—</span>
							<span>{bullet}</span>
						</div>
					</div>
				{/each}
			</div>
			<div class="mt-10 flex flex-col gap-3 sm:flex-row">
				<a
					href="#get-started"
					onclick={() =>
						typeof gtag === 'function' &&
						gtag('event', 'cta_click', {
							event_category: 'engagement',
							event_label: `geo_primary_${page.slug}`
						})}
					class="inline-flex items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-500 px-8 py-3.5 font-bold text-white transition-colors"
				>
					Request Your Storefront
				</a>
				<a
					href="/#how-ai-works"
					onclick={() =>
						typeof gtag === 'function' &&
						gtag('event', 'cta_click', {
							event_category: 'engagement',
							event_label: `geo_secondary_${page.slug}`
						})}
					class="inline-flex items-center justify-center rounded-lg border border-slate-600 px-8 py-3.5 font-semibold text-gray-300 transition-colors hover:border-slate-500 hover:text-white"
				>
					See How Search Is Changing
				</a>
			</div>
		</div>
	</div>
</section>

<section class="bg-[#030712] text-white py-16 md:py-20">
	<div class="container mx-auto max-w-5xl px-4 space-y-10">
		{#each page.sections as section (section.title)}
			<div class="rounded-lg border border-slate-700 bg-slate-900 p-8 md:p-10">
				<h2 class="font-display text-3xl font-black italic text-white text-balance mb-5">{section.title}</h2>
				<div class="space-y-4 text-lg leading-relaxed text-gray-300">
					{#each section.paragraphs ?? [] as paragraph (paragraph)}
						<p>{paragraph}</p>
					{/each}
				</div>
				{#if section.list}
					{#if section.listIntro}
						<p class="mt-6 text-base font-bold uppercase tracking-[0.18em] text-indigo-400">
							{section.listIntro}
						</p>
					{/if}
					<ul class="mt-4 grid gap-3 md:grid-cols-2">
						{#each section.list as item (item)}
							<li class="rounded-lg bg-slate-800 px-4 py-3 text-gray-300">{item}</li>
						{/each}
					</ul>
				{/if}
				{#if section.points}
					<div class="mt-6 grid gap-4 md:grid-cols-2">
						{#each section.points as point (point.title)}
							<div class="rounded-lg bg-slate-800 px-5 py-5">
								<h3 class="text-lg font-bold text-white">{point.title}</h3>
								<p class="mt-2 text-gray-300">{point.body}</p>
							</div>
						{/each}
					</div>
				{/if}
				{#if section.outro}
					<p class="mt-6 text-lg leading-relaxed text-gray-300">{section.outro}</p>
				{/if}
			</div>
		{/each}
	</div>
</section>

<section class="bg-slate-900 text-white py-16 md:py-20">
	<div class="container mx-auto max-w-5xl px-4">
		<div class="max-w-3xl">
			<SectionLabel>How It Works</SectionLabel>
			<h2 class="font-display text-3xl md:text-4xl font-black italic text-white text-balance">
				A clearer storefront, without a bloated website project.
			</h2>
		</div>
		<div class="mt-10 grid gap-6 md:grid-cols-3">
			{#each page.process as step, index (step.title)}
				<div class="rounded-lg border border-slate-700 bg-[#030712] p-8">
					<p class="text-sm font-bold uppercase tracking-[0.18em] text-indigo-400">
						Step {index + 1}
					</p>
					<h3 class="mt-3 text-2xl font-bold text-white text-balance">{step.title}</h3>
					<p class="mt-4 text-gray-400 leading-relaxed">{step.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#030712] text-white py-16 md:py-20">
	<div class="container mx-auto max-w-5xl px-4">
		<div class="max-w-3xl">
			<SectionLabel>FAQ</SectionLabel>
			<h2 class="font-display text-3xl md:text-4xl font-black italic text-white text-balance">
				Common questions before you fill out the form.
			</h2>
		</div>
		<div class="mt-10 grid gap-6 md:grid-cols-2">
			{#each page.faqs as faq (faq.question)}
				<div class="rounded-lg border border-slate-700 bg-slate-900 p-8">
					<h3 class="text-xl font-bold text-white text-balance">{faq.question}</h3>
					<p class="mt-4 text-gray-300 leading-relaxed">{faq.answer}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<FinalCTASection title={page.finalCta.title} body={page.finalCta.body} />
