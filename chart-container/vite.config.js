// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import federation from '@originjs/vite-plugin-federation'

const APPLICATION_PORT = 3002;

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    server: {
      port: APPLICATION_PORT,
    },
    preview: {
      port: APPLICATION_PORT,
    },
    build: {
      target: 'esnext',
      rollupOptions: {
        external: [
          "./node_modules",
        ],
      },
    },
    plugins: [
      vue({ 
        template: { transformAssetUrls }
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
        autoImport: true,
        styles: {
          configFile: 'src/styles/settings.scss',
        },
      }),
      federation({
        name: "chart-container",
        filename: "chartContainer.js",
        exposes: {
          "./App": "./src/App.vue",
        },
        shared: ["vue", "pinia"],
      }),
    ],
    define: { 'process.env': {}},
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: [
        '.js',
        '.json',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.vue',
      ],
    }
  }
})
