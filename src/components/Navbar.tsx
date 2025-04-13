import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Projects', href: '/projects' },
        { name: 'Blog', href: '/blog' },
        { name: 'Resume', href: '/resume' },
        { name: 'Contact', href: '/contact' },
    ]

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-sm transition-colors">
            <div className="max-w-4xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="font-bold text-xl dark:text-white">
                        Rhett Jorgensen
                    </Link>

                    <div className="flex items-center space-x-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    )
}