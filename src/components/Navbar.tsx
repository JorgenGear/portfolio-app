import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
    return (
        <nav className="bg-white dark:bg-gray-900 shadow-sm transition-colors">
            <div className="max-w-4xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="font-bold text-xl dark:text-white">
                        Your Name
                    </Link>

                    <div className="flex items-center space-x-6">
                        <Link href="/projects" className="hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
                            Projects
                        </Link>
                        <Link href="/games" className="hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
                            Fun
                        </Link>
                        <Link href="/contact" className="hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
                            Contact
                        </Link>
                        <Link href="/resume" className="hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
                            Resume
                        </Link>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    )
}