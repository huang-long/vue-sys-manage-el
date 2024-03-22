import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "VITE_", //环境变量默认前缀
  server: {
    headers: {
      // 如果需要用到ffmpeg合并视频，需要将COEP和COOP打开，来确保ShareArrayBuffer能够正常使用
      // https://blog.csdn.net/u012302552/article/details/132404422
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
    proxy: {
      "/sys-api": {
        target: "http://101.43.32.67:8081",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/sys-api/, ""),
      },
    },
  },
});
