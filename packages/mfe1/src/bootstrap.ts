import { createApp, type App } from "vue";
import AppComponent from "./App.vue";
import type { Option } from "./types";
import router from "../src/router/index.ts";



let app: App | null = null;
let mountedElement: HTMLElement | null = null;

export const init = (container: string | HTMLElement) => {
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
  mountedElement.style.width = "100%";
  mountedElement.style.height = "100%";
  mountedElement.style.backgroundColor="red";
  containerElement.appendChild(mountedElement);

  app = createApp(AppComponent);
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
export const getOptions = (): Option[] => {
  return [
    { id: "1", name: "Option 1" },
    { id: "2", name: "Option 2" },
  ];
};
