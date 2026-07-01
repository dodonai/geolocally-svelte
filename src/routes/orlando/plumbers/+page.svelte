<!--
	Redirect stub: orlando/plumbers is a legacy URL. Canonical is the
	descriptive `/ai-search-visibility-for-plumbers-in-orlando-fl` slug that
	mirrors the pattern AI Overviews cites. This file preserves crawl
	continuity via canonical + meta refresh (GitHub Pages has no server-side
	301 support). Search engines will treat the new URL as authoritative;
	humans get bounced immediately.
-->
<script>
	import { onMount } from 'svelte';

	const NEW_URL = 'https://geolocally.com/ai-search-visibility-for-plumbers-in-orlando-fl';

	onMount(() => {
		window.location.replace(NEW_URL);
	});
</script>

<svelte:head>
	<title>Redirecting… | GeoLocally</title>
	<link rel="canonical" href="https://geolocally.com/ai-search-visibility-for-plumbers-in-orlando-fl" />
	<meta http-equiv="refresh" content="0; url=https://geolocally.com/ai-search-visibility-for-plumbers-in-orlando-fl" />
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<main style="min-height: 60vh; display: flex; align-items: center; justify-content: center; padding: 2rem; text-align: center;">
	<div>
		<p style="margin-bottom: 1rem;">Redirecting to our updated page…</p>
		<p>
			<a href={NEW_URL} style="color: #4f46e5; text-decoration: underline;">
				Continue to the plumbers in Orlando page
			</a>
		</p>
	</div>
</main>
