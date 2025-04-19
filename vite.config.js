import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cesium from 'vite-plugin-cesium';
// @ts-ignore
import legacy from '@vitejs/plugin-legacy';
// @ts-ignore
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
    cesium(),
    legacy({
      targets: ['defaults', 'not IE 11', 'last 2 versions', '> 1%', 'Android >= 4.4'],
    }),
  ],
  resolve: {
    alias: {
      '@_public': path.resolve(__dirname, './src/_public'),
      '@pages': path.resolve(__dirname, './src/pages'),
      "@components": path.resolve(__dirname, './src/components'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
})
