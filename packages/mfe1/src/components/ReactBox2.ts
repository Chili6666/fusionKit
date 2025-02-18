import { createApp, type App } from "vue";
import AppComponent from "../App.vue";
import router from "../router/index.ts";

export class ReactBox extends HTMLElement {
  private mountPoint: HTMLElement | undefined;
  private app: App | null = null;

  constructor() {
    super();
  }

  async connectedCallback() {
    console.log("Loading remote component...");

    this.mountPoint = this.createMountElement(false);

    if (this.mountPoint) {
      this.app = createApp(AppComponent);
      this.app.use(router);
      this.app.mount(this.mountPoint);
    }
  }

  disconnectedCallback() {
    console.log("Unloading remote component...");
    if (this.app && this.mountPoint) {
      this.app.unmount();
      this.mountPoint.remove();
      this.app = null;
      this.mountPoint = undefined;
    }
  }

  //due to the fact that in case of the shadowRoot the styles are encapsulated
  //we need to create a mount element that will be used to mount the Vue app
  private createMountElement = (shadowRoot: boolean): HTMLElement => {
    const mountElement = document.createElement("div");
    if (shadowRoot) {
      const shadow = this.attachShadow({ mode: "open" });
      shadow.appendChild(mountElement);
    } else {
      this.appendChild(mountElement);
    }
    return mountElement;
  };
}

// Register the custom element
if (!customElements.get("react-box2")) {
  customElements.define("react-box2", ReactBox);
}
