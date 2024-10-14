/** @type {import('next').NextConfig} */

import webpack from "webpack";
const mode = process.env.BUILD_MODE ?? "standalone";
console.log("[Next] build mode", mode);
const disableChunk = !!process.env.DISABLE_CHUNK || mode === "export";
console.log("[Next] build with chunk: ", !disableChunk);

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    if (disableChunk) {
      config.plugins.push(
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
      );
    }

    config.resolve.fallback = {
      child_process: false,
    };
    return config;
  },
  images: {
    unoptimized: mode === "export",
  },
  experimental: {
    forceSwcTransforms: true,
  },
  output: mode,
};

export default nextConfig;
