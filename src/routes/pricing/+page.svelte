<script>
	import PricingSection from '$lib/components/sections/PricingSection.svelte';
	import FinalCTASection from '$lib/components/sections/FinalCTASection.svelte';
</script>

<svelte:head>
	<title>Pricing | GeoLocally — Storefronts from $499</title>
	<meta
		name="description"
		content="GeoLocally builds focused landing pages and explainer videos for local service businesses starting at $499. No retainers. No monthly minimums. See what's included."
	/>
	<link rel="canonical" href="https://geolocally.com/pricing" />
	<meta property="og:title" content="GeoLocally Pricing — Storefronts from $499" />
	<meta
		property="og:description"
		content="One focused landing page + custom explainer video + clean structure for search. Live in 3–5 business days. Starting at $499."
	/>
</svelte:head>

<section class="bg-[#030712] text-white pt-16 md:pt-24 pb-8">
	<div class="container mx-auto max-w-3xl px-4 text-center">
		<h1 class="font-display text-4xl md:text-5xl font-black italic text-white text-balance mb-4">
			Pricing built for action, not retainers.
		</h1>
		<p class="text-lg text-gray-300 leading-relaxed">
			One focused storefront. Live in 3 to 5 business days. No agency project, no long contract, no
			monthly minimum.
		</p>
	</div>
</section>

<PricingSection />

<section class="bg-slate-900 text-white py-16">
	<div class="container mx-auto max-w-3xl px-4 prose prose-lg prose-invert">
		<h2>What's actually included at $499</h2>
		<ul>
			<li>One focused landing page built around your real offer</li>
			<li>Custom animated explainer video (15–30 seconds)</li>
			<li>Copy written for your specific service + city</li>
			<li>Clean structure for Google and AI search (AEO)</li>
			<li>Mobile-first design</li>
			<li>Hosting and launch support for the first 30 days</li>
			<li>One round of revisions</li>
		</ul>

		<h2>What's not included</h2>
		<ul>
			<li>Multi-page website builds (we focus on the one storefront page)</li>
			<li>Ongoing SEO retainers</li>
			<li>Paid ad management</li>
			<li>Custom CRM integrations beyond standard form submissions</li>
		</ul>

		<h2>How payment works</h2>
		<p>
			50% to start, 50% on approval before launch. We invoice via Stripe. No subscriptions, no
			surprise charges.
		</p>

		<h2>What happens after launch</h2>
		<p>
			You own the page. Hosting transfers to you within 30 days, or you can stay on our hosting at
			a low monthly rate if you prefer not to manage it yourself.
		</p>
	</div>
</section>

<FinalCTASection />
