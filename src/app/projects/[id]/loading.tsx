import { motion } from 'framer-motion'

export default function Loading() {
    return (
        <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4">
                <div className="animate-pulse">
                    {/* Back button skeleton */}
                    <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
                    
                    {/* Title skeleton */}
                    <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
                    
                    {/* Image skeleton */}
                    <div className="w-full h-[400px] bg-gray-200 dark:bg-gray-700 rounded-xl mb-8"></div>
                    
                    {/* Description skeleton */}
                    <div className="space-y-4 mb-8">
                        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                    
                    {/* Tags skeleton */}
                    <div className="flex gap-2 mb-8">
                        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    </div>
                    
                    {/* Links skeleton */}
                    <div className="flex gap-4">
                        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
} 