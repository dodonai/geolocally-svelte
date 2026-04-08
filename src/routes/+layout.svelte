<script>
	import '../app.css';
	import NavBar from '$lib/components/layout/NavBar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import CookieConsent from '$lib/components/layout/CookieConsent.svelte';

	let { children } = $props();
</script>

<NavBar />
<main>
	{@render children()}
</main>
<Footer />
<CookieConsent />
