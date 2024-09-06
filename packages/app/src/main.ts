import { createApp } from 'vue'
import './out.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
// /**@ts-ignore */
// import router from 'virtual:router'
// /**@ts-ignore */
// import player from 'virtual:player'

createApp(App).use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  }
}).mount('#app')
