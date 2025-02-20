import { createApp, type App } from "vue";
import AppComponent from "./App.vue";

let app: App | null = null;
let mountedElement: HTMLElement | null = null;

export const mount = (container: string | HTMLElement) => {
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

  app = createApp(AppComponent);
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

export const name = "mfe2";

export const title = "MFE 2";

export const description = "This is a micro frontend module 2";

export const menuItems = [
  {
    id: "home",
    title: "Home",
    canExecute: true,
    icon: "home",
    execute: () => {
      console.log("Home clicked");
    },
    menuItems: [],
  },
  {
    id: "about",
    title: "About",
    canExecute: true,
    icon: "info",
    execute: () => {
      console.log("About clicked");
    },
    menuItems: [],
  },
];
