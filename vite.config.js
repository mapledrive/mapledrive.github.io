import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// import.meta.env.BASE_URL === /recognition/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    open: true,
    port: 3000,
  },
});
