import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "VITE_", //环境变量默认前缀
  server: {
    proxy: {
      "/sys-api": {
        target: "http://101.43.32.67:8081",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/sys-api/, ""),
      },
    },
  }
})
