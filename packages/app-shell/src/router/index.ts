// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/mfe1/:pathMatch(.*)*', // Use a wildcard to match all routes under /mfe1
      name: 'MFE1',
      //Important to use the function syntax here to lazy load the MicroFrontendWrapper
      //otherwise the MFE router is activated before the AppShell router
      component: () => import('../views/MicroFrontendWrapper.vue') // Lazy load the MicroFrontendWrapper
      //component: () => import('mfe1/ReactRemoteWrapper') // Lazy load the MicroFrontendWrapper
   },
    {
      path: '/mfe2',
      name: 'MFE2',
      component: () => import('mfe2/App')
    }
  ]
})

export default router