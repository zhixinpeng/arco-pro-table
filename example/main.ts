import { createApp } from 'vue'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import ProTable from '../components'

createApp(App).use(ProTable).use(ArcoVue).mount('#app')
