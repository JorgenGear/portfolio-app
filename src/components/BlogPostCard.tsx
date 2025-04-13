'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { BlogPost } from '@/lib/blog';

interface BlogPostCardProps {
    post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
            <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                    {post.title}
                </h2>
            </Link>
            
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime} min read</span>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                {post.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            
            <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
                Read more
                <FiArrowRight className="ml-2" />
            </Link>
        </motion.article>
    );
} 