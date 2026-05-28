<script>
	import '../app.css';
	import NavBar from '$lib/components/layout/NavBar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import CookieConsent from '$lib/components/layout/CookieConsent.svelte';

	let { children } = $props();

	// Site-wide Organization schema — loaded on every page so AI engines
	// and Google's Knowledge Graph can lift it regardless of landing path.
	const organizationSchema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'GeoLocally',
		legalName: 'Third Team Ventures LLC',
		url: 'https://geolocally.com',
		logo: 'https://geolocally.com/icon-512.png',
		email: 'hello@geolocally.com',
		description:
			'GeoLocally builds focused landing pages and short explainer videos for local service businesses in Florida that need to be understood faster online.',
		areaServed: {
			'@type': 'State',
			name: 'Florida',
			containedInPlace: {
				'@type': 'Country',
				name: 'United States'
			}
		},
		sameAs: [
			'https://x.com/hellogeolocally',
			'https://www.instagram.com/hellogeolocally/',
			'https://www.linkedin.com/company/geolocally/',
			'https://www.facebook.com/geolocally/'
		]
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(organizationSchema)}</` + `script>`}
</svelte:head>

<NavBar />
<main>
	{@render children()}
</main>
<Footer />
<CookieConsent />
