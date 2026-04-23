<script>
	const trustItems = [
		'One clear offer + service area',
		'$499 starting price',
		'Reply within 1 business day',
		'You own the video and content'
	];
</script>

<section class="relative flex flex-col justify-end md:justify-center bg-[#030712] text-white overflow-hidden min-h-[94svh] md:min-h-[92vh]">

	<!-- Full-bleed cinematic image -->
	<div class="absolute inset-0">
		<img
			src="/hero-cinematic.jpg"
			alt=""
			aria-hidden="true"
			class="w-full h-full object-cover object-[55%_18%] md:object-[65%_center]"
			loading="eager"
			fetchpriority="high"
		/>

		<!-- Mobile: top-to-bottom scrim — image shows above, text reads below -->
		<div class="absolute inset-0 md:hidden bg-gradient-to-b from-transparent from-20% via-[#030712]/75 via-50% to-[#030712]"></div>

		<!-- Desktop: left-to-right — solid dark over text zone, image reveals right -->
		<div class="absolute inset-0 hidden md:block bg-gradient-to-r from-[#030712] from-[32%] via-[#030712]/85 via-[56%] to-[#030712]/15"></div>

		<!-- Desktop: top edge vignette for nav legibility -->
		<div class="absolute inset-0 hidden md:block bg-gradient-to-b from-[#030712]/50 via-transparent to-transparent"></div>

		<!-- Desktop: bottom scrim to ease into StatsBar -->
		<div class="absolute inset-0 hidden md:block bg-gradient-to-t from-[#030712]/65 via-transparent to-transparent"></div>
	</div>

	<!-- Content -->
	<div class="relative z-10 container mx-auto px-6 md:px-10 py-16 md:py-28 max-w-7xl w-full">
		<div class="max-w-2xl">

			<!-- Eyebrow -->
			<div class="flex items-center gap-3 mb-6 md:mb-8">
				<div class="h-px bg-indigo-500 w-8 flex-shrink-0"></div>
				<span class="text-indigo-400 text-xs font-bold tracking-[0.22em] uppercase">
					Now accepting local businesses nationwide
				</span>
			</div>

			<!-- Headline — poster scale -->
			<h1 class="font-display text-[2.75rem] leading-[0.88] md:text-7xl lg:text-[5.5rem] font-black italic tracking-tight text-white mb-6 md:mb-8">
				Your customers aren't just Googling anymore.
				<span class="text-indigo-400"> They're choosing faster.</span>
				<span class="block text-3xl md:text-5xl lg:text-[3.5rem] mt-3 text-gray-300 font-black italic">
					Is your business clear enough to win the call?
				</span>
			</h1>

			<!-- Sub-headline -->
			<p class="text-base md:text-xl text-gray-400 leading-relaxed max-w-xl mb-8 md:mb-10">
				GeoLocally builds focused landing pages and short explainer videos for local service
				businesses. One page. One video. One clear next step. Starting at $499.
			</p>

			<!-- CTAs -->
			<div class="flex flex-col sm:flex-row gap-3 mb-8 md:mb-10">
				<a
					href="#get-started"
					onclick={() => typeof gtag === 'function' && gtag('event', 'cta_click', { event_category: 'engagement', event_label: 'hero_get_storefront' })}
					class="bg-white text-gray-900 hover:bg-gray-100 font-bold text-base px-8 py-4 rounded-lg shadow-lg transition-colors inline-flex items-center justify-center"
				>
					Request Your Storefront
				</a>
				<a
					href="#how-ai-works"
					class="inline-flex items-center justify-center border border-white/25 text-white/70 hover:border-white/55 hover:text-white font-semibold text-base px-8 py-4 rounded-lg transition-colors"
				>
					See How Search Is Changing
				</a>
			</div>

			<!-- Trust strip -->
			<div class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
				{#each trustItems as item (item)}
					<span class="flex items-center gap-2">
						<span class="text-indigo-500 font-bold leading-none">—</span>
						{item}
					</span>
				{/each}
			</div>

		</div>
	</div>
</section>
