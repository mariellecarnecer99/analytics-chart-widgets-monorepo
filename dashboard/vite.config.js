// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    build: {
      target: 'esnext',
      rollupOptions: {
        external: [
          "/node_modules/",
          "axios",
          "chart.js",
          "vuetify/lib/components/VIcon/index.mjs",
          "vuetify/labs/VDatePicker",
          "dom-to-image",
          "file-saver",
          "@vuepic/vue-datepicker",
          "@vuepic/vue-datepicker/dist/main.css",
          "moment",
          "vue3-json-editor",
          "vuetify/lib/components/VBtn/index.mjs",
          "vuetify/lib/components/VCard/index.mjs",
          "vuetify/lib/components/VCheckbox/index.mjs",
          "vuetify/lib/components/VColorPicker/index.mjs",
          "vuetify/lib/components/VDialog/index.mjs",
          "vuetify/lib/components/VDivider/index.mjs",
          "vuetify/lib/components/VGrid/index.mjs",
          "vuetify/lib/components/VMenu/index.mjs",
          "vuetify/lib/components/VSelect/index.mjs",
          "vuetify/lib/components/VSheet/index.mjs",
          "vuetify/lib/components/VSwitch/index.mjs",
          "vuetify/lib/components/VTabs/index.mjs",
          "vuetify/lib/components/VTextField/index.mjs",
          "vuetify/lib/components/VTextarea/index.mjs",
          "vuetify/lib/components/VToolbar/index.mjs"
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
        name: "dashboard",
        remotes: {
          pluggable_widget: "http://localhost:3001/assets/pluggableWidget.js",
          chart_container: "http://localhost:3002/assets/chartContainer.js",
        },
        shared: [
          "vue", 
          "pinia", 
          "chart.js",
        ],
      }),
    ],
    define: { 'process.env': {} },
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
