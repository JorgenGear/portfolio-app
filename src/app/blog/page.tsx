import { getBlogPosts } from '@/lib/blog';
import BlogPostCard from '@/components/BlogPostCard';

export default async function Blog() {
    const posts = await getBlogPosts();

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>
            
            <div className="space-y-8">
                {posts.map((post) => (
                    <BlogPostCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    );
} 