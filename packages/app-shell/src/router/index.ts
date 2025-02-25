import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MicroFrontendWrapper from '../views/MicrofrontendWrapper.vue';
import type { RemoteModuleConfiguration } from 'fusion-kit-contracts';
import { h } from 'vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/static-mfe',
    name: 'STATICMFE',
    component: () => import('static-mfe/App'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Cache for created components
const componentCache = new Map<string, any>();

// Function to create a new instance of MicroFrontendWrapper
const createMicroFrontendWrapper = (moduleName: string) => {
  return {
    render() {
      return h(MicroFrontendWrapper, { moduleName });
    },
  };
};

// Function to add routes dynamically
export const addMfeRoute = (mfeRoute: string) => {
  // Check if the component is already cached
  if (!componentCache.has(mfeRoute)) {
    // Create and cache the component
    componentCache.set(mfeRoute, createMicroFrontendWrapper(mfeRoute));
  }

  const route = {
    path: `/${mfeRoute}/:pathMatch(.*)*`, // Use a wildcard to match all routes under /mfe1
    name: mfeRoute.toUpperCase(),
    component: () => Promise.resolve(componentCache.get(mfeRoute)), // Return the cached component
    props: { moduleName: mfeRoute },
  };

  // Add the new route
  router.addRoute(route);

  // Force router to recognize new route
  router.options.routes = [...router.options.routes, route];
};

// Function to remove a route
export const removeMfeRoute = (mfeConfig: RemoteModuleConfiguration) => {
  router.removeRoute(mfeConfig.name);
  // Remove the cached component
  componentCache.delete(mfeConfig.name);
};

export default router;

// Export the router and the functions together
export const routerUtils = {
  addMfeRoute,
  removeMfeRoute,
};
