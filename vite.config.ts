/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [react()],

    test: {
      clearMocks: true,
      globals: true,
      testTimeout: 60000,
      hookTimeout: 60000,
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "integration/**"],
      setupFiles: "./src/test/setupTests.ts",
    },
  });
};
