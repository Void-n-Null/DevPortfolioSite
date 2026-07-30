import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects/godot-goap",
        destination: "https://werlinger.dev/projects/godot-goap-demo",
        statusCode: 301,
      },
      {
        source: "/projects/imagine-app",
        destination: "https://werlinger.dev/projects/imagineapp",
        statusCode: 301,
      },
      {
        source: "/projects/rebang",
        destination: "https://werlinger.dev/projects/rebang",
        statusCode: 301,
      },
      {
        source: "/:path*",
        destination: "https://werlinger.dev/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
