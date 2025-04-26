import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../client/src'),
      '@assets': path.resolve(__dirname, '../../public'),
      '@shared': path.resolve(__dirname, '../../shared'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  // Define the entry point for the static build
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  // Additional settings for static build
  server: {
    port: 4000,
  },
  // Configure the static build entry
  optimizeDeps: {
    entries: [
      path.resolve(__dirname, 'static-main.tsx')
    ]
  }
});