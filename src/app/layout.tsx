import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: {
        default: 'Rhett Jorgensen | Software Developer',
        template: '%s | Rhett Jorgensen'
    },
    description: 'Software developer specializing in web development, data analysis, and AI integration. Check out my projects and blog.',
    keywords: ['software developer', 'web development', 'data analysis', 'AI integration', 'portfolio', 'Rhett Jorgensen'],
    authors: [{ name: 'Rhett Jorgensen' }],
    creator: 'Rhett Jorgensen',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://rhettjorgensen.com',
        siteName: 'Rhett Jorgensen',
        title: 'Rhett Jorgensen | Software Developer',
        description: 'Software developer specializing in web development, data analysis, and AI integration.',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Rhett Jorgensen Portfolio'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Rhett Jorgensen | Software Developer',
        description: 'Software developer specializing in web development, data analysis, and AI integration.',
        images: ['/images/og-image.jpg'],
        creator: '@yourtwitterhandle'
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-site-verification',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            </head>
            <body className={inter.className}>
                <ThemeProvider>
                    <div className="min-h-screen flex flex-col">
                        <Navbar />
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
} 