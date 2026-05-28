<script>
	import StorefrontDemoAnimation from '$lib/components/hero/StorefrontDemoAnimation.svelte';
	import stats from '$lib/data/stats.json';
	import testimonials from '$lib/data/testimonials.json';
	import pricing from '$lib/data/pricing.json';

	const oldWay = [
		'Customer Googles "local service near me"',
		'Sees 10 blue links + ads',
		'Clicks around, compares, maybe calls'
	];
	const newWay = [
		'Customer asks ChatGPT "Who is the best local business in my city?"',
		'AI gives ONE direct recommendation',
		'Customer calls that business immediately'
	];

	const steps = [
		{
			num: '1',
			title: 'Tell us your business',
			body: "Share your business name, location, services, and phone number. Have a website? Just send the link — we pull what we need."
		},
		{
			num: '2',
			title: 'We build your storefront',
			body: 'We generate your SEO + AEO optimized landing page, write your video script, produce your animated explainer with a natural-sounding voiceover, add structured data for AI engines, and package it all together.'
		},
		{
			num: '3',
			title: 'Go live and get found',
			body: "Your digital storefront goes live in 3–5 business days. You're set up to show up on Google and to be a strong candidate for AI recommendations. Share your URL, link it from your Google Business Profile, post the video on social — it's all yours."
		}
	];
</script>

<svelte:head>
	<title>GeoLocally — Design Mockup (A24 Remix)</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<style>
	.font-display {
		font-family: 'Playfair Display', Georgia, serif;
	}
</style>

<div class="min-h-screen bg-[#030712] text-white">

	<!-- MOCKUP BANNER -->
	<div class="bg-indigo-600 text-white text-center text-xs font-black py-2 tracking-[0.15em] uppercase">
		Design Mockup — A24 Remix — Not Live
	</div>

	<!-- NAV -->
	<nav class="sticky top-0 z-50 bg-[#030712]/95 backdrop-blur-sm border-b border-slate-700/60">
		<div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
			<a href="#" class="text-white font-black text-xl tracking-tight">GeoLocally</a>
			<div class="hidden md:flex items-center gap-8">
				{#each ['The Shift', 'What You Get', 'Pricing'] as link}
					<a href="#" class="text-gray-400 hover:text-white text-xs font-bold tracking-[0.15em] uppercase transition-colors">
						{link}
					</a>
				{/each}
			</div>
			<a href="#" class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors">
				Get Your Storefront — $499
			</a>
		</div>
	</nav>

	<!-- HERO -->
	<section class="bg-[#030712] pt-20 pb-28">
		<div class="max-w-7xl mx-auto px-6">
			<!-- Eyebrow -->
			<div class="flex items-center gap-4 mb-12">
				<div class="h-px bg-indigo-500 w-12 flex-shrink-0"></div>
				<span class="text-indigo-400 text-xs font-bold tracking-[0.2em] uppercase">
					Now Accepting Local Businesses Nationwide
				</span>
			</div>

			<!-- Headline -->
			<h1
				class="font-display leading-[0.92] tracking-tight text-white mb-10 max-w-5xl"
				style="font-size: clamp(3.25rem, 8.5vw, 7.5rem); font-style: italic; font-weight: 900;"
			>
				Your customers aren't<br />
				just Googling anymore.<br />
				<span class="text-indigo-400">They're asking AI.</span><br />
				<span style="font-size: 0.6em; font-style: normal; font-weight: 700; color: #9ca3af;">
					Are you showing up?
				</span>
			</h1>

			<div class="grid lg:grid-cols-2 gap-16 items-start">
				<!-- Left: copy + CTAs -->
				<div>
					<p class="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
						GeoLocally builds you a video-first landing page engineered to rank on Google
						<em class="text-gray-300 font-medium not-italic">and</em> get recommended by ChatGPT,
						Perplexity, and every AI assistant your customers use. One page. One video. $499 to
						start — you own the content.
					</p>

					<div class="flex flex-col sm:flex-row gap-4 mb-12">
						<a href="#" class="bg-white hover:bg-gray-100 text-gray-900 font-bold px-8 py-4 rounded-xl text-base transition-colors text-center shadow-lg">
							Get Your Storefront — $499
						</a>
						<a href="#" class="border-2 border-white hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors text-center">
							See How AI Search Works
						</a>
					</div>

					<div class="flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-gray-500 font-medium">
						{#each ['Ranks on Google + AI', 'No agency fees', 'Live in 3–5 days', 'You own your content'] as item, i}
							{#if i > 0}<span class="text-gray-800 select-none">·</span>{/if}
							<span>{item}</span>
						{/each}
					</div>
				</div>

				<!-- Right: editorial stat card -->
				<div class="hidden lg:block">
					<div class="border border-slate-700 rounded-lg p-8 bg-slate-900/50">
						<p class="text-gray-600 text-xs font-bold tracking-[0.2em] uppercase mb-8">The landscape has shifted</p>
						<div class="divide-y divide-slate-700">
							{#each [
								{ stat: '58%', copy: 'of U.S. adults now use AI for local business recommendations', accent: true },
								{ stat: '3.2×', copy: 'more likely to call a business with a video-first profile', accent: false },
								{ stat: '$0', copy: 'ongoing agency fees. You own every word, every frame.', accent: false }
							] as row}
								<div class="py-6 first:pt-0 last:pb-0">
									<p class="font-display font-black leading-none mb-2 {row.accent ? 'text-indigo-400' : 'text-white'}" style="font-size: 3rem;">
										{row.stat}
									</p>
									<p class="text-gray-400 text-sm leading-relaxed">{row.copy}</p>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- STATS BAR -->
	<div class="border-y border-slate-700 bg-slate-900">
		<div class="max-w-7xl mx-auto px-6 py-10">
			<div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-700">
				{#each stats as stat}
					<div class="px-8 first:pl-0 last:pr-0">
						<p class="font-black text-3xl text-indigo-400 leading-none mb-1.5">{stat.value}</p>
						<p class="text-gray-500 text-xs font-medium leading-relaxed">{stat.label}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- THE SHIFT -->
	<section id="how-ai-works" class="bg-[#030712] py-28">
		<div class="max-w-7xl mx-auto px-6">
			<div class="flex items-center gap-5 mb-20">
				<div class="h-px bg-slate-700 flex-grow"></div>
				<span class="text-gray-600 text-xs font-bold tracking-[0.25em] uppercase whitespace-nowrap">The Shift</span>
				<div class="h-px bg-slate-700 flex-grow"></div>
			</div>

			<div class="text-center mb-16">
				<h2 class="font-display text-white leading-tight mb-6 mx-auto" style="font-size: clamp(2rem, 4vw, 3.25rem); font-style: italic; font-weight: 900; max-width: 700px;">
					Google isn't the only search engine anymore.
				</h2>
				<p class="text-gray-400 text-lg max-w-2xl mx-auto">
					Your customers are asking ChatGPT, Perplexity, Siri, and Alexa for recommendations. If
					your business isn't structured for AI — you don't exist.
				</p>
			</div>

			<div class="grid md:grid-cols-2 gap-6 mb-10">
				<!-- Old way -->
				<div class="bg-slate-900 border border-slate-700 rounded-lg p-8">
					<p class="text-gray-600 text-xs font-bold uppercase tracking-[0.2em] mb-6">How search used to work</p>
					<div class="flex flex-col gap-4">
						{#each oldWay as step, i}
							<div class="flex items-start gap-4">
								<span class="w-6 h-6 rounded-full bg-slate-700 text-gray-400 text-xs flex items-center justify-center flex-shrink-0 font-bold mt-0.5">{i + 1}</span>
								<p class="text-gray-400 text-sm leading-relaxed">{step}</p>
							</div>
						{/each}
					</div>
					<p class="mt-6 text-xs text-gray-600 border-t border-slate-700 pt-4">You needed SEO to rank here</p>
				</div>

				<!-- New way -->
				<div class="bg-slate-900 border-2 border-indigo-500 rounded-lg p-8">
					<p class="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">How search works now</p>
					<div class="flex flex-col gap-4">
						{#each newWay as step, i}
							<div class="flex items-start gap-4">
								<span class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center flex-shrink-0 font-bold mt-0.5">{i + 1}</span>
								<p class="text-gray-200 text-sm leading-relaxed font-medium">{step}</p>
							</div>
						{/each}
					</div>
					<p class="mt-6 text-xs text-indigo-400 font-semibold border-t border-indigo-500/30 pt-4">You need AEO to be the answer</p>
				</div>
			</div>

			<div class="bg-slate-900 border border-slate-700 rounded-lg py-6 px-8 text-center">
				<p class="text-base md:text-lg font-bold">
					GeoLocally builds your page for BOTH: strong local Google rankings and AI recommendations.
					<span class="text-indigo-400">One page handles everything.</span>
				</p>
			</div>
		</div>
	</section>

	<!-- SEE IT IN ACTION -->
	<section class="bg-slate-900 border-y border-slate-700 py-28">
		<div class="max-w-4xl mx-auto px-6 text-center">
			<div class="flex items-center gap-5 mb-16">
				<div class="h-px bg-slate-700 flex-grow"></div>
				<span class="text-gray-600 text-xs font-bold tracking-[0.25em] uppercase whitespace-nowrap">See It In Action</span>
				<div class="h-px bg-slate-700 flex-grow"></div>
			</div>

			<h2 class="font-display text-white mb-4 mx-auto" style="font-size: clamp(1.9rem, 3.5vw, 2.75rem); font-weight: 900; max-width: 600px;">
				Here's what a GeoLocally storefront looks like.
			</h2>
			<p class="text-gray-400 text-lg mb-12">
				A landing page, explainer video, structured data, and analytics — all built for you.
			</p>

			<div class="relative w-full bg-[#030712] border border-slate-700 rounded-xl overflow-hidden shadow-2xl mb-8 py-6">
				<StorefrontDemoAnimation />
			</div>

			<div class="flex flex-wrap justify-center gap-3">
				{#each ['Clear script', 'Natural voiceover', 'On-brand visuals', 'Social-ready exports'] as tag}
					<span class="bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 rounded-full px-4 py-1.5 text-sm font-medium">
						{tag}
					</span>
				{/each}
			</div>
		</div>
	</section>

	<!-- WHAT YOU GET -->
	<section id="what-you-get" class="bg-[#030712] py-28">
		<div class="max-w-7xl mx-auto px-6">
			<div class="flex items-center gap-5 mb-16">
				<div class="h-px bg-slate-700 flex-grow"></div>
				<span class="text-gray-600 text-xs font-bold tracking-[0.25em] uppercase whitespace-nowrap">What You Get</span>
				<div class="h-px bg-slate-700 flex-grow"></div>
			</div>

			<h2 class="font-display text-white mb-4 max-w-2xl" style="font-size: clamp(1.9rem, 3.5vw, 2.75rem); font-weight: 900;">
				Your complete digital storefront.
				<span class="text-indigo-400">Built for Google AND AI.</span>
			</h2>
			<p class="text-gray-400 text-lg max-w-2xl mb-16">
				Everything you need to show up everywhere your customers search — in one package, one price.
			</p>

			<div class="grid md:grid-cols-3 gap-6">
				<!-- Card 1 -->
				<div class="bg-slate-900 border border-indigo-500/40 rounded-lg p-8 flex flex-col">
					<span class="w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center mb-6 flex-shrink-0">1</span>
					<h3 class="font-bold text-white text-base mb-3 leading-snug">
						A page that ranks on Google AND gets recommended by AI
					</h3>
					<p class="text-gray-400 text-sm leading-relaxed flex-1">
						So your business can show up when someone Googles "local service near me" or asks ChatGPT "Who's the best local business near me?" Connected to your Google Business Profile. Mobile-first. Fast.
					</p>
					<span class="mt-6 w-fit bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 text-xs rounded-full px-3 py-1 font-medium">
						SEO + AEO Landing Page
					</span>
				</div>

				<!-- Card 2 -->
				<div class="bg-slate-900 border border-indigo-500/40 rounded-lg p-8 flex flex-col">
					<span class="w-8 h-8 rounded-full bg-indigo-500 text-white text-sm font-bold flex items-center justify-center mb-6 flex-shrink-0">2</span>
					<h3 class="font-bold text-white text-base mb-3 leading-snug">
						A video that builds trust in 60 seconds
					</h3>
					<p class="text-gray-400 text-sm leading-relaxed flex-1">
						A 30–60 second animated explainer that clearly shows what you do and why customers should call you. Natural-sounding voiceover and on-brand visuals. Not a basic slideshow. Delivered ready for your website, Instagram, TikTok, Facebook, and YouTube.
					</p>
					<span class="mt-6 w-fit bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 text-xs rounded-full px-3 py-1 font-medium">
						Custom Animated Video
					</span>
				</div>

				<!-- Card 3 — add-on -->
				<div class="bg-slate-900 border border-emerald-500/40 rounded-lg p-8 flex flex-col">
					<span class="w-8 h-8 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center mb-6 flex-shrink-0">+</span>
					<h3 class="font-bold text-white text-base mb-3 leading-snug">
						Keep your Google profile active on autopilot
					</h3>
					<p class="text-gray-400 text-sm leading-relaxed flex-1">
						We auto-publish weekly posts to your Google Business Profile, generate social media templates, and send you a monthly performance report — all on autopilot. Active profiles tend to rank higher on both Google and AI recommendations. Cancel anytime.
					</p>
					<div class="flex flex-wrap gap-2 mt-6">
						<span class="w-fit bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs rounded-full px-3 py-1 font-medium">Optional — from $149/mo</span>
						<span class="w-fit bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 text-xs rounded-full px-3 py-1 font-medium">Most popular add-on</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- HOW IT WORKS -->
	<section class="bg-slate-900 border-y border-slate-700 py-28">
		<div class="max-w-5xl mx-auto px-6">
			<div class="flex items-center gap-5 mb-16">
				<div class="h-px bg-slate-700 flex-grow"></div>
				<span class="text-gray-600 text-xs font-bold tracking-[0.25em] uppercase whitespace-nowrap">How It Works</span>
				<div class="h-px bg-slate-700 flex-grow"></div>
			</div>

			<div class="text-center mb-16">
				<h2 class="font-display text-white mb-4 mx-auto" style="font-size: clamp(1.9rem, 3.5vw, 2.75rem); font-style: italic; font-weight: 900; max-width: 600px;">
					Three steps. Three to five days. Zero headaches.
				</h2>
				<p class="text-gray-400 text-lg">No creative briefs. No strategy calls. No learning curve.</p>
			</div>

			<div class="grid md:grid-cols-3 gap-12">
				{#each steps as step}
					<div class="flex flex-col items-center text-center">
						<div class="w-12 h-12 rounded-full bg-indigo-600 text-white text-xl font-black flex items-center justify-center mb-6 shadow-lg shadow-indigo-900/50">
							{step.num}
						</div>
						<h3 class="font-bold text-white text-base mb-3">{step.title}</h3>
						<p class="text-gray-400 text-sm leading-relaxed">{step.body}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- PRICING -->
	<section id="pricing" class="bg-[#030712] py-28">
		<div class="max-w-7xl mx-auto px-6">
			<div class="flex items-center gap-5 mb-16">
				<div class="h-px bg-slate-700 flex-grow"></div>
				<span class="text-gray-600 text-xs font-bold tracking-[0.25em] uppercase whitespace-nowrap">Pricing</span>
				<div class="h-px bg-slate-700 flex-grow"></div>
			</div>

			<h2 class="font-display text-white mb-3 max-w-xl" style="font-size: clamp(1.9rem, 3.5vw, 2.75rem); font-weight: 900;">
				One job from your page pays for itself.
			</h2>
			<p class="text-gray-500 mb-14 text-base">No contracts. No lock-in. Cancel anytime.</p>

			<div class="grid md:grid-cols-3 gap-6 items-start">
				<!-- Digital Storefront -->
				<div class="border border-slate-700 rounded-lg p-8 bg-slate-900">
					<h3 class="text-white font-bold text-lg mb-1">Digital Storefront</h3>
					<p class="text-gray-500 text-sm mb-8">Everything you need to get found on Google + AI</p>
					<p class="font-display font-black text-white leading-none mb-1" style="font-size: 3.5rem;">$499</p>
					<p class="text-gray-600 text-xs mb-2">one-time setup</p>
					<p class="text-gray-400 text-sm font-semibold mb-8">Then $49/mo to keep it live</p>
					<hr class="border-slate-700 mb-6" />
					<ul class="space-y-3 mb-10">
						{#each pricing.coreFeatures as f}
							<li class="flex items-start gap-3 text-sm text-gray-400">
								<span class="text-indigo-500 flex-shrink-0 mt-0.5 font-bold">—</span>
								{f}
							</li>
						{/each}
					</ul>
					<a href="#" class="block text-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-lg transition-colors text-sm">
						Get Your Storefront — $499
					</a>
				</div>

				<!-- Growth — Recommended -->
				<div class="border-2 border-indigo-500 rounded-lg p-8 bg-slate-900 relative">
					<div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-black px-4 py-1 rounded-full tracking-wider uppercase whitespace-nowrap">
						Recommended
					</div>
					<h3 class="text-white font-bold text-lg mb-1">Growth</h3>
					<p class="text-gray-500 text-sm mb-8">Everything in Digital Storefront, plus full autopilot</p>
					<p class="font-display font-black text-indigo-400 leading-none mb-1" style="font-size: 3.5rem;">$149</p>
					<p class="text-gray-600 text-xs mb-1">/month</p>
					<p class="text-gray-700 text-xs mb-8">+ $499 one-time setup</p>
					<hr class="border-slate-700 mb-6" />
					<p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Everything in Digital Storefront, plus:</p>
					<ul class="space-y-3 mb-10">
						{#each pricing.growthFeatures as f}
							<li class="flex items-start gap-3 text-sm text-gray-300">
								<span class="text-indigo-400 flex-shrink-0 mt-0.5 font-bold">—</span>
								{f}
							</li>
						{/each}
					</ul>
					<a href="#" class="block text-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-lg transition-colors text-sm">
						Start Growing — $149/mo
					</a>
				</div>

				<!-- Enterprise -->
				<div class="border border-slate-700 rounded-lg p-8 bg-slate-900">
					<h3 class="text-white font-bold text-lg mb-1">Enterprise</h3>
					<p class="text-gray-500 text-sm mb-8">For businesses that want a full digital marketing partner</p>
					<p class="font-display font-black text-white leading-none mb-8" style="font-size: 3.5rem;">Custom</p>
					<p class="text-gray-400 text-sm leading-relaxed mb-8">
						Everything in Growth, plus human-crafted content, strategy calls, additional video production, multi-location support, and custom integrations.
					</p>
					<ul class="space-y-2 mb-10">
						{#each pricing.enterpriseItems as item}
							<li class="flex items-start gap-2 text-sm text-gray-500">
								<span class="text-gray-600 flex-shrink-0 mt-0.5">—</span>
								{item}
							</li>
						{/each}
					</ul>
					<a href="#" class="block text-center border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 font-bold py-3.5 rounded-lg transition-colors text-sm">
						Contact Us
					</a>
				</div>
			</div>

			<p class="text-center text-gray-700 text-xs mt-10">
				Yelp ads: $10,000+/yr &nbsp;·&nbsp; SEO agency: $500–$1,500/mo &nbsp;·&nbsp; Video studio: $5,000–$25,000 &nbsp;·&nbsp; GeoLocally: $499 + $49/mo
			</p>
		</div>
	</section>

	<!-- TESTIMONIALS -->
	<section class="bg-slate-900 border-y border-slate-700 py-24">
		<div class="max-w-7xl mx-auto px-6">
			<div class="flex items-center gap-5 mb-16">
				<div class="h-px bg-slate-700 flex-grow"></div>
				<span class="text-gray-600 text-xs font-bold tracking-[0.25em] uppercase whitespace-nowrap">From the Field</span>
				<div class="h-px bg-slate-700 flex-grow"></div>
			</div>

			<div class="grid md:grid-cols-3 gap-12">
				{#each testimonials as t}
					<div>
						<p class="font-display text-gray-100 leading-snug mb-6" style="font-size: 1.125rem; font-style: italic;">
							"{t.quote}"
						</p>
						<p class="text-indigo-400 text-xs font-bold tracking-wider uppercase">{t.name}</p>
						<p class="text-gray-600 text-xs mt-0.5">{t.business}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- FINAL CTA -->
	<section class="bg-[#030712] py-32">
		<div class="max-w-7xl mx-auto px-6 text-center">
			<div class="flex items-center justify-center gap-5 mb-14">
				<div class="h-px bg-slate-700 w-20"></div>
				<span class="text-gray-700 text-xs font-bold tracking-[0.25em] uppercase">Get Started</span>
				<div class="h-px bg-slate-700 w-20"></div>
			</div>

			<h2
				class="font-display text-white mb-6 mx-auto"
				style="font-size: clamp(2.75rem, 6.5vw, 5.5rem); font-style: italic; font-weight: 900; line-height: 1.0; max-width: 900px;"
			>
				Your next customer<br />
				<span class="text-indigo-400">is already asking.</span>
			</h2>
			<p class="text-gray-400 text-lg mb-12 max-w-md mx-auto leading-relaxed">
				Get a landing page built to answer them — on Google, on ChatGPT, on every AI assistant they use.
			</p>

			<a href="#" class="inline-block bg-white hover:bg-gray-100 text-gray-900 font-black px-12 py-5 rounded-xl text-lg transition-colors shadow-lg">
				Get Your Storefront — $499
			</a>
			<p class="text-gray-700 text-sm mt-5">
				Reply within 1 business day &nbsp;·&nbsp; 3–5 days to go live &nbsp;·&nbsp; No contracts
			</p>
		</div>
	</section>

	<!-- FOOTER -->
	<footer class="border-t border-slate-700 bg-[#030712] py-10">
		<div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
			<span class="text-white font-black text-lg tracking-tight">GeoLocally</span>
			<p class="text-gray-700 text-xs">© 2026 GeoLocally. All rights reserved.</p>
			<div class="flex gap-6 text-gray-600 text-xs">
				<a href="/privacy" class="hover:text-gray-300 transition-colors">Privacy</a>
				<a href="/terms" class="hover:text-gray-300 transition-colors">Terms</a>
			</div>
		</div>
	</footer>
</div>
