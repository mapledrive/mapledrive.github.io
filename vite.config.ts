import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      app: path.resolve(__dirname, './src/app'),
      components: path.resolve(__dirname, './src/components'),
      assets: path.resolve(__dirname, './src/assets'),
      pages: path.resolve(__dirname, './src/pages'),
      fonts: path.resolve(__dirname, './src/fonts'),
      style: path.resolve(__dirname, './src/style'),
      features: path.resolve(__dirname, './src/features'),
      sagas: path.resolve(__dirname, './src/sagas'),
      utils: path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    open: true,
    port: 3000,
  },
});
