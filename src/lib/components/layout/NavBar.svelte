<script>
	import { ChevronDown, Menu, X } from 'lucide-svelte';
	import BrandLogo from '$lib/components/layout/BrandLogo.svelte';

	let mobileOpen = $state(false);
	let citiesOpen = $state(false);
	let verticalsOpen = $state(false);

	const cities = [
		{ label: 'Florida (statewide)', href: '/florida' },
		{ label: 'Miami', href: '/miami' },
		{ label: 'Tampa', href: '/tampa' },
		{ label: 'Orlando', href: '/orlando' },
		{ label: 'Jacksonville', href: '/jacksonville' },
		{ label: 'Fort Lauderdale', href: '/fort-lauderdale' },
		{ label: 'St. Petersburg', href: '/st-petersburg' },
		{ label: 'West Palm Beach', href: '/west-palm-beach' },
		{ label: 'Cape Coral', href: '/cape-coral' },
		{ label: 'Tallahassee', href: '/tallahassee' }
	];

	const verticals = [
		{ label: 'Plumbers', href: '/for/plumbers' },
		{ label: 'Dentists', href: '/for/dentists' },
		{ label: 'Lawyers', href: '/for/lawyers' },
		{ label: 'Real Estate Agents', href: '/for/real-estate-agents' },
		{ label: 'Insurance Agents', href: '/for/insurance-agents' },
		{ label: 'Salons & Med Spas', href: '/for/salons-and-medspas' },
		{ label: 'Auto Repair', href: '/for/auto-repair' },
		{ label: 'Accountants', href: '/for/accountants' }
	];

	const topLinks = [
		{ label: 'Pricing', href: '/pricing' },
		{ label: 'FAQ', href: '/faq' },
		{ label: 'Blog', href: '/blog' }
	];

	function closeMobile() {
		mobileOpen = false;
		citiesOpen = false;
		verticalsOpen = false;
	}
</script>

<nav class="sticky top-0 z-50 border-b border-slate-700/60 bg-black/95 backdrop-blur-sm">
	<div class="container mx-auto px-4 py-2 md:py-2.5 flex items-center justify-between gap-3">
		<BrandLogo variant="light" sizeClass="w-[132px] sm:w-[148px] md:w-[168px]" />

		<div class="hidden md:flex items-center gap-5 text-[13px] font-medium text-gray-400">
			<!-- Cities dropdown -->
			<div class="relative group">
				<button
					type="button"
					class="flex items-center gap-1 hover:text-white transition-colors py-2"
				>
					Cities
					<ChevronDown class="w-3.5 h-3.5" />
				</button>
				<div
					class="absolute left-0 top-full mt-1 w-56 rounded-lg border border-slate-700 bg-black shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150"
				>
					<div class="flex flex-col py-2">
						{#each cities as link (link.href)}
							<a
								href={link.href}
								class="px-4 py-1.5 text-[13px] text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
							>
								{link.label}
							</a>
						{/each}
					</div>
				</div>
			</div>

			<!-- For You (verticals) dropdown -->
			<div class="relative group">
				<button
					type="button"
					class="flex items-center gap-1 hover:text-white transition-colors py-2"
				>
					For You
					<ChevronDown class="w-3.5 h-3.5" />
				</button>
				<div
					class="absolute left-0 top-full mt-1 w-56 rounded-lg border border-slate-700 bg-black shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150"
				>
					<div class="flex flex-col py-2">
						{#each verticals as link (link.href)}
							<a
								href={link.href}
								class="px-4 py-1.5 text-[13px] text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
							>
								{link.label}
							</a>
						{/each}
					</div>
				</div>
			</div>

			{#each topLinks as link (link.href)}
				<a href={link.href} class="hover:text-white transition-colors">{link.label}</a>
			{/each}
		</div>

		<div class="flex items-center gap-3">
			<a
				href="/#get-started"
				onclick={() =>
					typeof gtag === 'function' &&
					gtag('event', 'cta_click', {
						event_category: 'engagement',
						event_label: 'nav_request_storefront'
					})}
				class="hidden md:inline-flex bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-4 py-1.5 text-[13px] transition-colors"
			>
				Request Your Storefront
			</a>
			<button
				type="button"
				class="md:hidden p-1.5 text-gray-300 hover:text-white transition-colors"
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={mobileOpen}
			>
				{#if mobileOpen}
					<X class="w-5 h-5" />
				{:else}
					<Menu class="w-5 h-5" />
				{/if}
			</button>
		</div>
	</div>

	{#if mobileOpen}
		<div class="md:hidden border-t border-slate-700 bg-black max-h-[calc(100vh-3rem)] overflow-y-auto">
			<div class="container mx-auto px-4 py-3 flex flex-col gap-1">
				<!-- Cities mobile collapsible -->
				<button
					type="button"
					class="flex items-center justify-between py-2.5 px-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
					onclick={() => (citiesOpen = !citiesOpen)}
					aria-expanded={citiesOpen}
				>
					<span>Cities</span>
					<ChevronDown class={`w-4 h-4 transition-transform ${citiesOpen ? 'rotate-180' : ''}`} />
				</button>
				{#if citiesOpen}
					<div class="ml-3 flex flex-col gap-1 mb-1">
						{#each cities as link (link.href)}
							<a
								href={link.href}
								class="block py-2 px-3 text-[13px] text-gray-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
								onclick={closeMobile}
							>
								{link.label}
							</a>
						{/each}
					</div>
				{/if}

				<!-- Verticals mobile collapsible -->
				<button
					type="button"
					class="flex items-center justify-between py-2.5 px-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
					onclick={() => (verticalsOpen = !verticalsOpen)}
					aria-expanded={verticalsOpen}
				>
					<span>For You</span>
					<ChevronDown class={`w-4 h-4 transition-transform ${verticalsOpen ? 'rotate-180' : ''}`} />
				</button>
				{#if verticalsOpen}
					<div class="ml-3 flex flex-col gap-1 mb-1">
						{#each verticals as link (link.href)}
							<a
								href={link.href}
								class="block py-2 px-3 text-[13px] text-gray-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
								onclick={closeMobile}
							>
								{link.label}
							</a>
						{/each}
					</div>
				{/if}

				{#each topLinks as link (link.href)}
					<a
						href={link.href}
						class="block py-2.5 px-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
						onclick={closeMobile}
					>
						{link.label}
					</a>
				{/each}

				<a
					href="/#get-started"
					class="mt-2 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
					onclick={closeMobile}
				>
					Request Your Storefront
				</a>
			</div>
		</div>
	{/if}
</nav>
