import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 같은 와이파이의 휴대폰 등에서 개발 서버(npm run dev)에 접속할 수 있도록 허용
  allowedDevOrigins: ["192.168.*.*"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
