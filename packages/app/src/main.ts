import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'

createApp(App).use(
  createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: () => import('./components/MainView.vue'),       
      }
    ]
  })
).mount('#app')
