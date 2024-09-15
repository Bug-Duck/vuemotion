import { createApp } from 'vue'
import App from '@vue-motion/app/src/App.vue'
import '@vue-motion/app/src/out.css'
import player from './player'
import router from './router'

createApp(App).use(player).use(router).mount('#app')
