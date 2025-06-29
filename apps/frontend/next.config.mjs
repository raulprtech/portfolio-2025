import path from "path"

/** @type {import('next').NextConfig} */
export default {
  experimental: {
    appDir: true,
    /** allow imports that live outside apps/frontend */
    externalDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack(config) {
    // ✅ route "@/…" to this app’s *src* folder
    const srcPath = path.resolve(__dirname, "src")
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": srcPath,
      "@/components": path.join(srcPath, "components"),
      "@/lib": path.join(srcPath, "lib"),
    }
    return config
  },
}
