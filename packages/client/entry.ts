import { createApp } from 'vue'
// import './out.css'
/** @ts-ignore  */
import App from 'virtual:user-main'
/**@ts-ignore */
import router from 'virtual:router'
/**@ts-ignore */
import player from 'virtual:player'

console.log(player)

createApp(App).use(router).use(player).mount('#app')
