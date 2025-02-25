import { createApp, type App } from "vue";
import AppComponent from "./App.vue";
import type { Module, ModuleConfiguration } from "fusion-kit-contracts";
import { MapBinder } from "./utils";

let app: App | null = null;
let mountedElement: HTMLElement | null = null;
let mapBinder: MapBinder | null = null;

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

  mapBinder = new MapBinder();

  app = createApp(AppComponent);
  app.provide("logger", moduleConfiguration?.logger);
  app.provide("mapBinder", mapBinder);
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
      if (mapBinder != null) mapBinder.moveMapTo(51.2895, 6.7668); // Coordinates for DUS Airport
    },
    menuItems: [],
  },
  {
    id: "fra",
    title: "Airport FRA",
    canExecute: true,
    icon: "airportFRA",
    execute: () => {
      if (mapBinder != null) mapBinder.moveMapTo(50.0379, 8.5622); // Coordinates for FRA Airport
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
