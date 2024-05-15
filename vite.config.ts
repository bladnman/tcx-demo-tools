import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
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
      '@classes': path.resolve(__dirname, './src/classes'),
      '@common': path.resolve(__dirname, './src/common'),
      '@const': path.resolve(__dirname, './src/const'),
      '@data': path.resolve(__dirname, './src/data'),
      '@dialogs': path.resolve(__dirname, './src/features/dialogs'),
      '@features': path.resolve(__dirname, './src/features'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@root': path.resolve(__dirname, '.'),
      '@store': path.resolve(__dirname, './src/store'),
      '@src': path.resolve(__dirname, './src'),
      '@tcx-hosted': path.resolve(__dirname, './src/tcx-hosted'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
