import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      //The name of your host application
      name: "mfe2",
      // The file name of the remote entry
      filename: "remoteEntry.js",
      // Modules to expose
      exposes: {
        "./App": "./src/App.vue",
        './bootstrap': './src/bootstrap.ts'
      },
      // Common dependencies that should be shared
      shared: ["vue"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
        format: 'esm'
      },
    },
  },
});
