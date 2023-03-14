import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      entryRoot: path.resolve(__dirname, 'src/components'),
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'ArcoProTable',
      formats: ['es'],
      fileName: 'index.js',
    },
    rollupOptions: {
      external: ['vue', '@arco-design/web-vue', 'dayjs', 'lodash', 'sortablejs'],
      output: {
        globals: {
          vue: 'Vue',
          '@arco-design/web-vue': 'ArcoVue',
          dayjs: 'dayjs',
          lodash: '_',
          sortablejs: 'Sortable',
        },
      },
    },
  },
})
