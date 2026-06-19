<script>
	import BlogPostLayout from '$lib/components/marketing/BlogPostLayout.svelte';
	import { blogPostBySlug } from '$lib/content/blog-posts';

	const post = blogPostBySlug['aeo-checklist-for-local-service-businesses'];
</script>

<BlogPostLayout {post}>
	{@html post.bodyHtml}
</BlogPostLayout>
