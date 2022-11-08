import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "VITE_", //环境变量默认前缀
  server: {
    proxy: {
      "/sys-api": {
        target: "http://106.12.116.166:8080",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/sys-api/, ""),
      },
    },
  }
})
