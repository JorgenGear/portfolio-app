import { motion } from 'framer-motion'

export default function BlogLoading() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="animate-pulse">
                <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
                
                <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
                
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-8">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"
                        ></div>
                    ))}
                </div>
                
                <div className="h-64 w-full bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
                
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 