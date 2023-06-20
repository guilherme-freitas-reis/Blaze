/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/games/mines",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
