import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
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
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    minifyHtml(),
    injectHtml({
      data: {
        title: 'Vite Vue Starter',
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
});
