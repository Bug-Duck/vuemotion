import { createApp } from 'vue'
import './out.css'
import App from './App.vue'
/**@ts-ignore */
import router from 'virtual:router'

createApp(App).use(router).mount('#app')
