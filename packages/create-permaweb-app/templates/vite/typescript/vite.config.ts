import { defineConfig } from 'vite';
// @ts-ignore
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      process: 'process/browser',
      util: 'util',
    },
  },
  plugins: [react()],
});
