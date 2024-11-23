'use client'

import { motion } from 'framer-motion'

export default function ResumeLoading() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded mx-auto mb-4 animate-pulse" />
                <div className="flex justify-center gap-4">
                    <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>
            </div>

            {[1, 2, 3].map((section) => (
                <div key={section} className="mb-12">
                    <div className="h-8 w-40 bg-gray-200 dark:bg-gray-800 rounded mb-6 animate-pulse" />
                    <div className="space-y-4">
                        {[1, 2].map((item) => (
                            <div key={item} className="h-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
