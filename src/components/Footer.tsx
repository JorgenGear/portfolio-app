import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Rhett Jorgensen</h3>
                        <p className="text-gray-400">
                            Data Analytics & Product Development Professional based in Utah
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
                                <Link href="/resume" className="hover:text-white transition">
                                    Resume
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/JorgenGear"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition"
                            >
                                <FaGithub className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/rhett-jorgensen/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition"
                            >
                                <FaLinkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-500 text-sm">
                    <p>&copy; {currentYear} Rhett Jorgensen. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
