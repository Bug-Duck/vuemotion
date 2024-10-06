import { createApp } from 'vue'
import './output.css'
import App from './App.vue'
import Preview from './components/Preview.vue'
import 'font-awesome/css/font-awesome.css'
// /**@ts-ignore */
// import router from 'virtual:router'
// /**@ts-ignore */
// import player from 'virtual:player'

if (__D__) {
  createApp(App).mount('#app')
} else {
  createApp(Preview).mount('#app')
}
