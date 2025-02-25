import { createApp, type App } from "vue";
import AppComponent from "./App.vue";
import type { Module, ModuleConfiguration } from "fusion-kit-contracts";

let app: App | null = null;
let mountedElement: HTMLElement | null = null;

const mount = (
  container: string | HTMLElement,
  moduleConfiguration?: ModuleConfiguration
) => {
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
  app.provide("logger", moduleConfiguration?.logger);
  app.mount(mountedElement);

  return app;
};

const unmount = () => {
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

const name = "mfe2";

const title = "MFE 2";

const description = "This is a micro frontend module 2";

const menuItems = [
  {
    id: "dus",
    title: "Airport DUS",
    canExecute: true,
    icon: "airportDUS",
    execute: () => {
      console.log("show DUS");
    },
    menuItems: [],
  },
  {
    id: "fra",
    title: "Airport FRA",
    canExecute: true,
    icon: "airportFRA",
    execute: () => {
      console.log("show FRA");
    },
    menuItems: [],
  },
];

const mfe2Module: Module = {
  name,
  title,
  description,
  menuItems,
  mount,
  unmount,
};

export default mfe2Module;