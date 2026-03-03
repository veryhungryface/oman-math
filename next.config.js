const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.i-screammedia.com",
        pathname: "/**"
      }
    ]
  }
};

module.exports = nextConfig;
