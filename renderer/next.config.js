module.exports = {
  env: {
    API_KEY: process.env.API_KEY,
  },
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
    }

    return config;
  },
};