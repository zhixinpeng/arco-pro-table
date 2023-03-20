import { createApp } from 'vue'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue/es/arco-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon/arco-vue-icon'
import '@arco-design/web-vue/dist/arco.css'
import ProTable from '../components'

const app = createApp(App)

app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(ProTable)

app.mount('#app')
