import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => ({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist', // совпадает с React Scripts, если хотите сохранить папку билда
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src/app'), // для alias 'app'
      features: path.resolve(__dirname, 'src/features'), // для alias 'features'
      components: path.resolve(__dirname, 'src/components'),
      fonts: path.resolve(__dirname, 'src/fonts'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      pages: path.resolve(__dirname, 'src/pages'),
      sagas: path.resolve(__dirname, 'src/sagas'),
      utils: path.resolve(__dirname, 'src/utils'),
      style: path.resolve(__dirname, 'src/style.jsx'),
    },
  },
  server: {
    open: true,
    port: 3000,
  },
}));
