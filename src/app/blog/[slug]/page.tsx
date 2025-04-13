import { notFound } from 'next/navigation';
import { getBlogPost } from '@/lib/blog';
import BlogPostContent from './BlogPostContent';

interface Props {
    params: {
        slug: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BlogPost({ params }: Props) {
    const post = await getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    return <BlogPostContent post={post} />;
} 