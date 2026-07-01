<script>
	import LeadCapturePanel from '$lib/components/marketing/LeadCapturePanel.svelte';
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';

	// $99 pilot offer landing page.
	// Status: DRAFT — kept on branch pending founder green-light on pricing.
	// The route is prerendered as a real page; unlink from nav until the offer is greenlit.
	// The audit-request form uses the same mailto fallback pattern as /audit.
	const subject = encodeURIComponent('$99 Pilot inquiry');
	const body = encodeURIComponent(
		'Hey GeoLocally,\n\nI\'d like to be considered for the $99 pilot.\n\nBusiness name:\nService:\nCity:\nWebsite (if any):\nPhone:\n\nI understand that in exchange for the discount, GeoLocally can use my business as a case study (logo, quote, before/after AI search screenshots) for up to 24 months.\n\nThanks.'
	);
	const mailto = `mailto:hello@geolocally.com?subject=${subject}&body=${body}`;
</script>

<svelte:head>
	<title>$99 Pilot — First 3 customers get case-study pricing | GeoLocally</title>
	<meta name="description" content="Building the first 3 case studies. GeoLocally at $99 flat (was $499) in exchange for testimonial + before/after AI search screenshots. Florida local service businesses only." />
	<link rel="canonical" href="https://geolocally.com/pilot" />
</svelte:head>

<!-- HERO -->
<section class="bg-gray-900 text-white">
	<div class="container mx-auto max-w-4xl px-4 py-20 md:py-24 text-center">
		<SectionLabel>3 spots — that is it</SectionLabel>
		<h1 class="font-display text-4xl md:text-6xl font-black italic leading-tight text-balance mb-6 mt-4">
			$99 for the first 3 pilots.
		</h1>
		<p class="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
			Standard price is $499. For the first 3 Florida businesses, it's $99 — in exchange for us using
			your business as a case study once you're happy with the result.
		</p>
		<a
			href={mailto}
			class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-gray-900 transition-colors hover:bg-gray-100"
		>
			Request a pilot spot
		</a>
		<p class="mt-4 text-sm text-gray-500">3 spots. First come, first served.</p>
	</div>
</section>

<!-- WHY -->
<section class="bg-[#030712] text-white py-16 md:py-20">
	<div class="container mx-auto max-w-3xl px-4">
		<h2 class="font-display text-3xl md:text-4xl font-black italic text-white mb-8">Why we're doing this</h2>
		<div class="space-y-6 text-gray-300 leading-relaxed text-lg">
			<p>
				We launched GeoLocally in June. Our positioning — AEO for Florida local service businesses,
				flat fee, 5 days — works in theory. We need to prove it in practice.
			</p>
			<p>
				3 pilot customers. Real work at $99 instead of $499. In exchange, we get to publish the
				before/after: what ChatGPT and Google AI said about the business at day 0, what they say
				after we ship, and what changed on the page and Google Business Profile to move the needle.
			</p>
			<p>
				After the 3 pilots are done and the case studies are published, the price goes back to
				$499. This is a one-time cohort — we don't run rolling discounts.
			</p>
		</div>
	</div>
</section>

<!-- WHAT YOU GET -->
<section class="bg-slate-900 text-white py-16 md:py-20">
	<div class="container mx-auto max-w-3xl px-4">
		<h2 class="font-display text-3xl md:text-4xl font-black italic text-white mb-10">What you get (same as $499)</h2>
		<div class="grid md:grid-cols-2 gap-6">
			<div class="border border-slate-700 rounded-lg bg-slate-800 p-6">
				<h3 class="text-lg font-bold text-white mb-2">A focused landing page</h3>
				<p class="text-gray-300 leading-relaxed">
					One page at its own URL, written and structured so ChatGPT, Perplexity, and Google AI
					Overview can summarise it cleanly. Includes LocalBusiness + Service + FAQ schema.
				</p>
			</div>
			<div class="border border-slate-700 rounded-lg bg-slate-800 p-6">
				<h3 class="text-lg font-bold text-white mb-2">A 30-second explainer video</h3>
				<p class="text-gray-300 leading-relaxed">
					Above the fold. Says who you are, where you serve, and what makes you different in
					plain English. Sound-off ready.
				</p>
			</div>
			<div class="border border-slate-700 rounded-lg bg-slate-800 p-6">
				<h3 class="text-lg font-bold text-white mb-2">NAP audit + fixes</h3>
				<p class="text-gray-300 leading-relaxed">
					We check your business name, address, and phone across Google Business Profile, Yelp,
					BBB, and top directories, and hand you a specific list of what to fix.
				</p>
			</div>
			<div class="border border-slate-700 rounded-lg bg-slate-800 p-6">
				<h3 class="text-lg font-bold text-white mb-2">Review-language guide</h3>
				<p class="text-gray-300 leading-relaxed">
					A short script for asking customers to leave reviews that AI tools will actually
					cite — naming the specific job, the specific city, the specific outcome.
				</p>
			</div>
		</div>
		<p class="text-center text-gray-500 mt-8">Live in 5 business days. Total time from you: about 30 minutes on day 1 + 30 minutes on day 5.</p>
	</div>
</section>

<!-- THE TRADE -->
<section class="bg-[#030712] text-white py-16 md:py-20">
	<div class="container mx-auto max-w-3xl px-4">
		<h2 class="font-display text-3xl md:text-4xl font-black italic text-white mb-8">The trade — explicit</h2>
		<div class="space-y-4 text-gray-300 leading-relaxed text-lg">
			<p>You pay <strong class="text-white">$99 flat.</strong> Non-negotiable. Everything else same as $499.</p>
			<p>In exchange, for <strong class="text-white">24 months</strong> after delivery, GeoLocally can:</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>Use your business name, city, and logo in our marketing materials (website, decks, outreach)</li>
				<li>Publish one written testimonial from you (we'll draft it, you approve or edit)</li>
				<li>Publish before/after screenshots showing your AI search visibility on ChatGPT, Perplexity, Google AI Overview, Gemini, and Copilot</li>
				<li>Reference you as a customer example in sales conversations</li>
			</ul>
			<p>
				Not exclusive. Doesn't transfer any of your trademarks. You can request removal after the
				24-month period ends.
			</p>
			<p>
				That's the whole trade. If it's not worth it to you, no hard feelings — the standard $499
				price is fine and always available at <a href="/pricing" class="underline">/pricing</a>.
			</p>
		</div>
	</div>
</section>

<!-- WHO -->
<section class="bg-slate-900 text-white py-16 md:py-20">
	<div class="container mx-auto max-w-3xl px-4">
		<h2 class="font-display text-3xl md:text-4xl font-black italic text-white mb-8">Who this pilot is for</h2>
		<p class="text-lg text-gray-300 leading-relaxed mb-6">
			Florida local service businesses only. Plumbing, HVAC, dental, med spa, law, roofing,
			electrical, or similar. If you're an interesting story — first female plumber in your county,
			military spouse building a solo practice, third-generation family shop — we'd love to hear it.
			We're picking 3 businesses that will make good case studies alongside good work.
		</p>
		<p class="text-lg text-gray-300 leading-relaxed">
			<strong class="text-white">Not a fit if:</strong> you sell online to a national audience,
			you're a franchise, you're outside Florida, or you don't have a working website + Google
			Business Profile to iterate from.
		</p>
	</div>
</section>

<!-- BOTTOM CTA -->
<section class="bg-gray-900 text-white py-16 md:py-20">
	<div class="container mx-auto max-w-3xl px-4 text-center">
		<h2 class="font-display text-3xl md:text-4xl font-black italic text-white mb-6">Ready?</h2>
		<p class="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl mx-auto">
			Send us a note with your business name, service, and city. We'll reply within 1 business day
			with a straight yes or a straight no on whether you're a fit.
		</p>
		<a
			href={mailto}
			class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-gray-900 transition-colors hover:bg-gray-100"
		>
			Request a pilot spot
		</a>
		<p class="mt-4 text-sm text-gray-500">Or email <a href="mailto:hello@geolocally.com" class="underline">hello@geolocally.com</a> directly.</p>
	</div>
</section>
