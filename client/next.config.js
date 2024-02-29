const nextConfig = {
  // assetPrefix: '.',
  distDir: 'dist',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
        port: '',
        pathname: '**',
      },
    ],
  },
  // reactStrictMode: true,
  trailingSlash: true,
};

module.exports = nextConfig;
