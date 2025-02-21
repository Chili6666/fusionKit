// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MicroFrontendWrapper from '../views/MicrofrontendWrapper.vue'

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
      component: MicroFrontendWrapper,
      props: { moduleName: 'mfe1' } // Pass the moduleName prop
   },
    {
      path: '/mfe2/:pathMatch(.*)*',
      name: 'MFE2',
      component: MicroFrontendWrapper, 
      props: { moduleName: 'mfe2' } // Pass the moduleName prop
    }
  ]
})

export default router