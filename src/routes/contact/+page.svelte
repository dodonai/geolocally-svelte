<script>
	import FinalCTASection from '$lib/components/sections/FinalCTASection.svelte';
</script>

<svelte:head>
	<title>Contact GeoLocally — Email Us or Start an Intake</title>
	<meta
		name="description"
		content="Contact GeoLocally — email hello@geolocally.com or start an intake on our homepage. Replies usually within one business day."
	/>
	<link rel="canonical" href="https://geolocally.com/contact" />
	<meta property="og:title" content="Contact GeoLocally" />
	<meta property="og:description" content="Email or intake form. Reply within one business day." />
</svelte:head>

<section class="bg-[#030712] text-white pt-16 md:pt-24 pb-8">
	<div class="container mx-auto max-w-3xl px-4 text-center">
		<h1 class="font-display text-4xl md:text-5xl font-black italic text-white text-balance mb-4">
			Two ways to reach us.
		</h1>
		<p class="text-lg text-gray-300 leading-relaxed">
			Replies usually within one business day. Pick whichever's easier.
		</p>
	</div>
</section>

<section class="bg-slate-900 text-white py-16">
	<div class="container mx-auto max-w-3xl px-4">
		<div class="grid md:grid-cols-2 gap-6">
			<div class="border border-slate-700 rounded-lg bg-slate-800 p-8">
				<h2 class="font-display text-2xl font-black italic text-white mb-3">Email</h2>
				<p class="text-gray-300 mb-5 leading-relaxed">
					Fastest path. Tell us about your business, your city, and what you'd like a clearer
					storefront to do for you.
				</p>
				<a
					href="mailto:hello@geolocally.com"
					class="inline-block bg-white text-slate-900 font-bold px-6 py-3 rounded-md hover:bg-gray-200 transition"
				>
					hello@geolocally.com
				</a>
			</div>

			<div class="border border-slate-700 rounded-lg bg-slate-800 p-8">
				<h2 class="font-display text-2xl font-black italic text-white mb-3">Intake form</h2>
				<p class="text-gray-300 mb-5 leading-relaxed">
					Prefer a form? The intake on our homepage walks you through the same basics — business,
					city, current site if you have one.
				</p>
				<a
					href="/#contact"
					class="inline-block bg-white text-slate-900 font-bold px-6 py-3 rounded-md hover:bg-gray-200 transition"
				>
					Start an intake
				</a>
			</div>
		</div>

		<div class="prose prose-lg prose-invert mt-12 text-center mx-auto">
			<p class="text-gray-400">
				Operated by Third Team Ventures LLC. Based in the Philippines, serving local service
				businesses primarily in Florida.
			</p>
		</div>
	</div>
</section>

<FinalCTASection />
