import { defineVitestConfig } from '@nuxt/test-utils/config'
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import AutoImport from "unplugin-auto-import/vite";
import { fileURLToPath } from 'node:url'
import path from 'path'

export default defineVitestConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }), 
    AutoImport({ imports: ["vue"]}),
  ],
  test: {
    globals: true,
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        domEnvironment: 'jsdom', 
      }
    },
    server: {
      deps: {
        inline: ['vuetify'],
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './components'),
      '~': path.resolve(__dirname, './pages'),
    }
  },
});