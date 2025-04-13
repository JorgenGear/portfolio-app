import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiCalendar, FiClock, FiTag } from 'react-icons/fi'

interface BlogPostProps {
  title: string
  date: string
  readTime: string
  excerpt: string
  slug: string
  imageUrl: string
  tags: string[]
}

export default function BlogPost({
  title,
  date,
  readTime,
  excerpt,
  slug,
  imageUrl,
  tags
}: BlogPostProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      <Link href={`/blog/${slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center mr-4">
            <FiCalendar className="mr-1" />
            {date}
          </div>
          <div className="flex items-center">
            <FiClock className="mr-1" />
            {readTime}
          </div>
        </div>

        <Link href={`/blog/${slug}`}>
          <h2 className="text-xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
            {title}
          </h2>
        </Link>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {excerpt}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
} 