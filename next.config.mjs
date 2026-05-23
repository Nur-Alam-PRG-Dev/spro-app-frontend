/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/targetVsAchivement',
        destination: '/targetVsAchievement',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
