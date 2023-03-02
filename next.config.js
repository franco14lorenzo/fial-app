/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'zsxqbrxszrvvdmphbdas.supabase.co'],
    loader: 'custom',
    loaderFile: './src/lib/supabase.ts'
  }
}

module.exports = nextConfig
