import { createApp } from 'vue'
import './out.css'
import App from './App.vue'
/**@ts-ignore */
import router from 'virtual:router'
/**@ts-ignore */
import player from 'virtual:player'

createApp(App).use(router).use(player).mount('#app')
