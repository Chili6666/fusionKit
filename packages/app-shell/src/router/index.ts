// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MicroFrontendWrapper from '../views/MicrofrontendWrapper.vue';
import type { RemoteModuleConfiguration } from 'fusion-kit-contracts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    // {
    //   path: '/mfe1/:pathMatch(.*)*', // Use a wildcard to match all routes under /mfe1
    //   name: 'MFE1',
    //   //Important to use the function syntax here to lazy load the MicroFrontendWrapper
    //   //otherwise the MFE router is activated before the AppShell router
    //   component: MicroFrontendWrapper,
    //   props: { moduleName: 'mfe1' }, // Pass the moduleName prop
    // },
    // {
    //   path: '/mfe2/:pathMatch(.*)*',
    //   name: 'MFE2',
    //   component: MicroFrontendWrapper,
    //   props: { moduleName: 'mfe2' }, // Pass the moduleName prop
    // },
    {
      path: '/static-mfe',
      name: 'STATICMFE',
      component: () => import('static-mfe/App')
    }
  ],
});

// Function to add routes dynamically
export function addMfeRoute(mfeRoute: string) {
  const route = {
    path: `/${mfeRoute}/:pathMatch(.*)*`, // Use a wildcard to match all routes under /mfe1
    name: mfeRoute.toUpperCase(),
    component: () => Promise.resolve(MicroFrontendWrapper), // Return a Promise that resolves to the component
    props: { moduleName: mfeRoute },
  };
  
  // Add the new route
  router.addRoute(route);
  
  // Force router to recognize new route
  router.options.routes = [...router.options.routes, route];
}

//Function to remove a route
export function removeMfeRoute(mfeConfig: RemoteModuleConfiguration) {
  router.removeRoute(mfeConfig.name)
}

export default router;

// Export the router and the functions together
export const routerUtils = {
  addMfeRoute,
  removeMfeRoute,
};
