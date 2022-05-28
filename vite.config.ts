import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: true,
    port: 3001,
    hmr: {
      overlay: false //禁用服务器错误遮罩层
    }
  }
});
