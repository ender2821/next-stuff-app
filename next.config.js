/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },

  webpack(config) {
    config.module.rules.push({
        test: /\.svg$/,
        use: {
            loader: '@svgr/webpack',
            options: {
                svgoConfig: {
                    plugins: [
                        {
                            name: 'removeViewBox',
                            active: false,
                        },
                    ],
                },
            },
        },
    });
      return config;
  },
}

module.exports = nextConfig

