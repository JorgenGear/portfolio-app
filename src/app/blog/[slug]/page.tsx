import { notFound } from 'next/navigation';
import { getBlogPost } from '@/lib/blog';
import BlogPostContent from './BlogPostContent';

interface PageProps {
    params: {
        slug: string;
    };
}

export default async function BlogPost({ params }: PageProps) {
    const post = await getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    return <BlogPostContent post={post} />;
} 