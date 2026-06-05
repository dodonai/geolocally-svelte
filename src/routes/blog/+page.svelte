<script>
	import LeadCapturePanel from '$lib/components/marketing/LeadCapturePanel.svelte';
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
	import { blogPosts } from '$lib/content/blog-posts';
</script>

<svelte:head>
	<title>How Local Businesses Show Up in AI Search | GeoLocally Blog</title>
	<meta
		name="description"
		content="Plain-English guides for local businesses that want to be found by ChatGPT, Perplexity, and Google AI — not just buried in blue links."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://geolocally.com/blog" />
	<meta property="og:title" content="How Local Businesses Show Up in AI Search | GeoLocally Blog" />
	<meta
		property="og:description"
		content="Plain-English guides for local businesses that want to be found by ChatGPT, Perplexity, and Google AI — not just buried in blue links."
	/>
	<meta property="og:image" content="https://geolocally.com/og-image.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="How Local Businesses Show Up in AI Search | GeoLocally Blog" />
	<meta
		name="twitter:description"
		content="Plain-English guides for local businesses that want to be found by ChatGPT, Perplexity, and Google AI — not just buried in blue links."
	/>
	<meta name="twitter:image" content="https://geolocally.com/og-image.png" />
	<link rel="canonical" href="https://geolocally.com/blog" />
</svelte:head>

<section class="bg-gray-900 text-white">
	<div class="container mx-auto max-w-6xl px-4 py-20 md:py-24">
		<div class="max-w-4xl">
			<SectionLabel>Insights</SectionLabel>
			<h1 class="font-display text-4xl md:text-6xl font-black italic leading-tight text-balance mb-6">
				How local businesses show up in AI search.
			</h1>
			<p class="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
				ChatGPT, Perplexity, and Google AI are picking which local business gets the call. Here is
				what is changing, what to fix first, and how to make your business easier for AI to
				recommend.
			</p>
		</div>
	</div>
</section>

<section class="bg-[#030712] text-white py-16 md:py-20">
	<div class="container mx-auto max-w-6xl px-4">
		<div class="grid gap-6 md:grid-cols-2">
			{#each blogPosts as post (post.slug)}
				<article class="rounded-lg border border-slate-700 bg-slate-900 p-8">
					<img
						src={post.coverImage}
						alt={post.coverAlt}
						class="aspect-[1200/630] w-full rounded-lg border border-slate-700 object-cover"
						loading="lazy"
					/>
					<div class="mt-5 flex flex-wrap gap-3 text-sm text-gray-500">
						<span class="font-bold uppercase tracking-[0.18em] text-indigo-400">
							{post.category}
						</span>
						<span aria-hidden="true">·</span>
						<span>{post.displayDate}</span>
						<span aria-hidden="true">·</span>
						<span>{post.readingTime}</span>
					</div>
					<h2 class="font-display mt-5 text-2xl font-black italic text-white text-balance">
						<a href={`/blog/${post.slug}`} class="transition-colors hover:text-indigo-400">
							{post.title}
						</a>
					</h2>
					<p class="mt-4 text-base leading-relaxed text-gray-400">{post.description}</p>
					<a
						href={`/blog/${post.slug}`}
						class="mt-8 inline-flex items-center font-bold text-indigo-400 transition-colors hover:text-indigo-300 text-sm uppercase tracking-wider"
					>
						Read article →
					</a>
				</article>
			{/each}
		</div>

		<div class="mt-16">
			<LeadCapturePanel
				title="Want a storefront that makes your business easier to understand online?"
				body="Tell us what you do and where you work. If GeoLocally can help, we'll reply with the next step within 1 business day."
				eventLabel="blog_index_lead_panel"
			/>
		</div>
	</div>
</section>
