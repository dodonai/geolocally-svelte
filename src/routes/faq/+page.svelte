<script>
	import FAQSection from '$lib/components/sections/FAQSection.svelte';
	import FinalCTASection from '$lib/components/sections/FinalCTASection.svelte';
	import faqs from '$lib/data/faq.json';

	// FAQPage JSON-LD schema — critical for AEO (ChatGPT, Perplexity, Google AI Overviews
	// pull structured FAQ data preferentially)
	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((f) => ({
			'@type': 'Question',
			name: f.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: f.answer
			}
		}))
	};
</script>

<svelte:head>
	<title>GeoLocally FAQ — Pricing, Scope, Timeline</title>
	<meta
		name="description"
		content="Answers to common questions about GeoLocally — pricing, what's included, who it's for, how it differs from a website redesign, and what AEO means for local businesses."
	/>
	<link rel="canonical" href="https://geolocally.com/faq" />
	<meta property="og:title" content="GeoLocally FAQ — Common Questions About Local Storefronts" />
	<meta
		property="og:description"
		content="Pricing, scope, timeline, AEO — straight answers to the questions we get most."
	/>
	{@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</` + `script>`}
</svelte:head>

<section class="bg-[#030712] text-white pt-16 md:pt-24 pb-8">
	<div class="container mx-auto max-w-3xl px-4 text-center">
		<h1 class="font-display text-4xl md:text-5xl font-black italic text-white text-balance mb-4">
			Common questions, straight answers.
		</h1>
		<p class="text-lg text-gray-300 leading-relaxed">
			These are the questions we get most often. If yours isn't here, just reply to
			<a class="underline" href="mailto:hello@geolocally.com">hello@geolocally.com</a>.
		</p>
	</div>
</section>

<FAQSection />

<FinalCTASection />
