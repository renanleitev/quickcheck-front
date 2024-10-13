import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { qrcode } from 'vite-plugin-qrcode';

const port = 9090;

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), qrcode()],
  preview: {
    port: port
  },
  server: {
    port: port
  }
});
