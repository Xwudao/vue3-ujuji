import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import PurgeIcons from 'vite-plugin-purge-icons';
import { minifyHtml, injectHtml } from 'vite-plugin-html';
// https://vitejs.dev/config/
const resolve = (p: string) => {
  return path.resolve(__dirname, p);
};
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src'),
    },
    extensions: ['.ts', '.js'],
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    minifyHtml(),
    injectHtml({
      data: {
        title: '优聚集 多用户导航系统',
        injectScript: '',
      },
    }),
    PurgeIcons({
      /* PurgeIcons Options */
      content: [
        '**/*.html',
        // '**/*.js',
        '**/*.vue', // scan for .vue file as well
      ],
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://api2.ujuji.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    cors: true,
  },
});
