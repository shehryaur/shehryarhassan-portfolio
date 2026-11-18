/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  // Project detail pages and empty tabs were folded into /projects and the home page.
  async redirects() {
    return [
      { source: "/projects/:slug", destination: "/projects#:slug", permanent: true },
      { source: "/highlights", destination: "/#highlights", permanent: true },
      { source: "/highlights/:slug", destination: "/#:slug", permanent: true },
      { source: "/:path(about|blogs|tools)", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
