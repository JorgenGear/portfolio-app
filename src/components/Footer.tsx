import Link from 'next/link'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Your Name</h3>
                        <p className="text-gray-400">
                            Data Analytics & Web Development Professional based in [Your Location]
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/projects" className="hover:text-white transition">
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link href="/data-viz" className="hover:text-white transition">
                                    Data Visualization
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Connect Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            {/* GitHub */}
                            <a
                                href="https://github.com/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition"
                                aria-label="GitHub"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
