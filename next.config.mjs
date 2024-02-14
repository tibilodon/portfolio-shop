/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.SUPABASE_STORAGE,
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
