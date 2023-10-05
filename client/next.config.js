/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/u/*',
            }
        ]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/repositories',
                permanent: true,
            },
        ]
    }
}

module.exports = nextConfig
