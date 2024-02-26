import baseConfig from "./vite.config.base";
import serveConfig from "./vite.config.serve";
import buildConfig from "./vite.config.serve";
import { defineConfig, loadEnv } from "vite";

const viteConfig = {
  build: () => ({ ...baseConfig, ...buildConfig }),
  serve: () => ({ ...baseConfig, ...serveConfig }),
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  loadEnv(mode, process.cwd());
  return viteConfig[command]();
});
