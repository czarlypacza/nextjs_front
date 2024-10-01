/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      swcPlugins: [['fluentui-next-appdir-directive', { paths: ['@griffel', '@fluentui'] }]],
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com',
          port: '',
          // pathname: '/account123/**',
        },
      ],
    },
  };

export default nextConfig;
