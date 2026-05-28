<script>
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import StatsBar from '$lib/components/sections/StatsBar.svelte';
	import TheShiftSection from '$lib/components/sections/TheShiftSection.svelte';
	import ProblemSection from '$lib/components/sections/ProblemSection.svelte';
	import SampleVideoSection from '$lib/components/sections/SampleVideoSection.svelte';
	import WhatYouGetSection from '$lib/components/sections/WhatYouGetSection.svelte';
	import HowItWorksSection from '$lib/components/sections/HowItWorksSection.svelte';
	import WhoItsForSection from '$lib/components/sections/WhoItsForSection.svelte';
	import TestimonialsSection from '$lib/components/sections/TestimonialsSection.svelte';
	import ObjectionSection from '$lib/components/sections/ObjectionSection.svelte';
	import PricingSection from '$lib/components/sections/PricingSection.svelte';
	import FAQSection from '$lib/components/sections/FAQSection.svelte';
	import FinalCTASection from '$lib/components/sections/FinalCTASection.svelte';
</script>

<svelte:head>
	<title>GeoLocally — Landing Pages for Local Service Businesses</title>
	<meta
		name="description"
		content="Focused landing pages and short explainer videos for local service businesses in Florida. Live in 3–5 days. Starting at $499."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://geolocally.com" />
	<meta property="og:title" content="GeoLocally — Landing Pages for Local Service Businesses" />
	<meta property="og:description" content="Focused landing pages and short explainer videos for local service businesses in Florida. Live in 3–5 days. Starting at $499." />
	<meta property="og:image" content="https://geolocally.com/og-image.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="GeoLocally — Landing Pages for Local Service Businesses" />
	<meta name="twitter:description" content="Focused landing pages and short explainer videos for local service businesses in Florida. Live in 3–5 days. Starting at $499." />
	<meta name="twitter:image" content="https://geolocally.com/og-image.png" />
	<link rel="canonical" href="https://geolocally.com" />
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Service",
		"name": "GeoLocally Digital Storefront",
		"url": "https://geolocally.com",
		"serviceType": "Landing page and explainer video design for local service businesses",
		"areaServed": { "@type": "State", "name": "Florida" },
		"description": "Focused landing pages and short explainer videos for local service businesses in Florida.",
		"offers": {
			"@type": "Offer",
			"price": "499",
			"priceCurrency": "USD",
			"description": "One-time, starting at $499. Live in 3–5 days."
		},
		"provider": { "@type": "Organization", "name": "GeoLocally" }
	})}</script>`}
</svelte:head>

<HeroSection />
<StatsBar />
<TheShiftSection />
<ProblemSection />
<SampleVideoSection />
<WhatYouGetSection />
<HowItWorksSection />
<WhoItsForSection />
<TestimonialsSection />
<ObjectionSection />
<PricingSection />
<FAQSection />
<FinalCTASection />
