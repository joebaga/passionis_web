/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  experimental: {
    forceSwcTransforms: true,
  },
  env: {
    NEXT_PUBLIC_TOSS_TOSS_CLIENT_KEY: process.env.NEXT_PUBLIC_TOSS_TOSS_CLIENT_KEY,
    TOSS_SECRET_KEY: process.env.TOSS_SECRET_KEY,
  },
};

export default nextConfig;
