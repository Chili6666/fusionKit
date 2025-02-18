import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // All components starting with "inf-" are web components
          isCustomElement: tag => tag.startsWith('react-'),
        },
      },
    }),
    federation({
      //The name of your host application
      name: "mfe1",
      filename: "remoteEntry.js",
      // Modules to expose
      exposes: {
        "./App": "./src/App.vue",
        "./Navigation": "./src/components/Navigation.vue",
        "./ReactRemoteWrapper": "./src/components/ReactRemoteWrapper.vue",
        "./Flights": "./src/views/Flights.vue",
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
      },
    },
  },
});
