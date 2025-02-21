import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

import remotes from './public/config/remotes.json';

const getFormattedRemotes = () => {
  return Object.fromEntries(Object.entries(remotes).map(([key, value]) => [key, value.url]));
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'app-shell',
      remotes: getFormattedRemotes(),
      shared: ['vue'],
    }),
  ],
  build: {
    target: 'esnext', // Use a target that supports top-level await
    minify: false,
    cssCodeSplit: false,
  },
});
