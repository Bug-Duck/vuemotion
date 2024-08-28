import { createWebHistory, createRouter } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./Scene1.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./Scene2.vue')
    },
   ]
})
