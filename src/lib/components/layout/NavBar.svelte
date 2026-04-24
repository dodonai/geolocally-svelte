<script>
	import { Menu, X } from 'lucide-svelte';
	import BrandLogo from '$lib/components/layout/BrandLogo.svelte';

	let mobileOpen = $state(false);

	const navLinks = [
		{ label: 'The Shift', href: '/#how-ai-works' },
		{ label: 'The Problem', href: '/#problem' },
		{ label: 'What You Get', href: '/#what-you-get' },
		{ label: 'Pricing', href: '/#pricing' },
		{ label: 'Blog', href: '/blog' }
	];

	function closeMobile() {
		mobileOpen = false;
	}
</script>

<nav class="sticky top-0 z-50 border-b border-slate-700/60 bg-black/95 backdrop-blur-sm">
	<div class="container mx-auto px-4 py-2 md:py-2.5 flex items-center justify-between gap-3">
		<BrandLogo variant="light" sizeClass="w-[132px] sm:w-[148px] md:w-[168px]" />
		<div class="hidden md:flex items-center gap-6 text-[13px] font-medium text-gray-400">
			{#each navLinks as link (link.href)}
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
		<div class="md:hidden border-t border-slate-700 bg-black">
			<div class="container mx-auto px-4 py-3 flex flex-col gap-1">
				{#each navLinks as link (link.href)}
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
