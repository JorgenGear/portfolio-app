/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        forceSwcTransforms: true
    },
    poweredByHeader: false,
    reactStrictMode: true
}

module.exports = nextConfig
