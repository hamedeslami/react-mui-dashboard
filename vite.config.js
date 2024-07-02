import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"

// https://vitejs.dev/config/

export default ({ mode }) => {
  const env = Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  const processEnvValues = {
    "process.env": Object.entries(env).reduce((prev, [key, val]) => {
      return {
        ...prev,
        [key]: val,
      };
    }, {}),
  };

  return defineConfig({
    plugins: [react()],
    base: env.PUBLIC_URL,
    define: processEnvValues,
    optimizeDeps: {
      exclude: ['js-big-decimal']
    },
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@images": path.resolve(__dirname, "./src/assets/images"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@store": path.resolve(__dirname, "./src/store"),
        "@config": path.resolve(__dirname, "./src/config"),
      },
    },
  });
};