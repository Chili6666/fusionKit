import { createApp, type App } from "vue";
import AppComponent from "./App.vue";
import router from './router';
import type { ModuleConfiguration } from 'fusion-kit-contracts';

let app: App | null = null;
let mountedElement: HTMLElement | null = null;

export const mount = (container: string | HTMLElement, moduleConfiguration?: ModuleConfiguration) => {
  if (app) {
    throw new Error("App already initialized");
  }

  let containerElement: HTMLElement | null;

  if (typeof container === "string") {
    containerElement = document.getElementById(container);
    if (!containerElement) {
      throw new Error(`Container with id "${container}" not found`);
    }
  } else {
    containerElement = container;
  }

  // Create a new div element to mount the app
  mountedElement = document.createElement("div");
  containerElement.appendChild(mountedElement);

  //Only for showcase
  const keys = moduleConfiguration?.encryptedStorage?.getKeys();
  if (keys) {
    keys.forEach(key => {
      console.log(key);
    });
  }

  app = createApp(AppComponent);
  app.provide("moduleConfiguration", moduleConfiguration);
  app.provide("logger", moduleConfiguration?.logger);
  app.use(router);
  app.mount(mountedElement);

  return app;
};

export const unmount = () => {
  if (!app || !mountedElement) {
    throw new Error("No app instance to unmount");
  }

  // Unmount the app
  app.unmount();

  // Remove the mounted element from DOM
  mountedElement.remove();

  // Reset the references
  app = null;
  mountedElement = null;
};

export const name = "mfe1";

export const title = "MFE 1";

export const description = "This is a micro frontend module 1";

export const menuItems = [
  {
    id: "flights",
    title: "Show Flights",
    canExecute: true,
    icon: "flights",
    execute: () => {
      console.log("show flights");
      router.push("/");

    },
    menuItems: [],
  },
  {
    id: "airport",
    title: "Airport Info",
    canExecute: true,
    icon: "info",
    execute: () => {
      console.log("show airport info");
      router.push("/placeholder");
    },
    menuItems: [],
  },
];
