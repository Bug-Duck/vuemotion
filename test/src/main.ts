import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { createPlayer } from '@vue-motion/core'

createApp(App).use(createPlayer({})).mount('#app')
