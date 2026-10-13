<script>
	import BlogPostLayout from '$lib/components/marketing/BlogPostLayout.svelte';
	import { blogPostBySlug } from '$lib/content/blog-posts';

	const post = blogPostBySlug['does-aeo-actually-drive-customers'];
</script>

<BlogPostLayout {post}>
	{@html post.bodyHtml}
</BlogPostLayout>
