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
      entryRoot: path.resolve(__dirname, 'components'),
      copyDtsFiles: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'components/index.ts'),
      name: 'ArcoProTable',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'vue',
        '@arco-design/web-vue',
        '@arco-design/web-vue/es/icon',
        'dayjs',
        'lodash',
        'sortablejs',
      ],
    },
  },
})
