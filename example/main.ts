import { createApp } from 'vue'
import App from './App.vue'
import '@arco-design/web-vue/dist/arco.css'
import ProTable from '../components'

const app = createApp(App)

app.use(ProTable)

app.mount('#app')
