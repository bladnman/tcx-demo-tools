import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '',
  resolve: {
    /**
     * Paths are relative to the baseUrl
     * Remember to update in tsconfig file also
     *
     * @assets/* -> ./src/assets/*
     * @common/* -> ./src/common/*
     * @data/* -> ./src/data/*
     * @hooks/* -> ./src/hooks/*
     * @pages/* -> ./src/pages/*
     * @store/* -> ./src/store/*
     * @theme/* -> ./src/theme/*
     * @utils/* -> ./src/utils/*
     */
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@common': path.resolve(__dirname, './src/common'),
      '@data': path.resolve(__dirname, './src/data'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@tcx-hosted': path.resolve(__dirname, './src/tcx-hosted'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
