'use client';

import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { BlogPost } from '@/lib/blog';

interface BlogPostContentProps {
    post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto px-4 py-12"
        >
            <Link
                href="/blog"
                className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-8"
            >
                <FiArrowLeft className="mr-2" />
                Back to Blog
            </Link>

            <article className="prose prose-lg dark:prose-invert max-w-none">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 mb-8">
                    <time dateTime={post.date}>{post.date}</time>
                    <span>•</span>
                    <span>{post.readTime} min read</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="mb-8">
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <MDXRemote {...post.content} />
                </div>
            </article>
        </motion.div>
    );
} 