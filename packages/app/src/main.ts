import { createApp } from 'vue'
import './out.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import App from './App.vue'
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
      cssLayer: false,
    },
  },
}).mount('#app')
