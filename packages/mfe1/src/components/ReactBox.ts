export class ReactBox extends HTMLElement {
  private containerRef: HTMLElement | undefined;

  constructor() {
    super();
  }

  async connectedCallback() {
    // Create shadow root
    const shadow = this.attachShadow({ mode: "open" });

    console.log("Loading remote component...");

    // Create the template with content
    const template = `<div id="remote-container"></div>`;

    // Set the innerHTML of the shadow root
    shadow.innerHTML = template;

    // Access the red-box element
    const redBox = shadow.querySelector("#remote-container");
    if (redBox) {
      // You can now manipulate the redBox element as needed
      this.containerRef = redBox as HTMLElement;

      if (this.containerRef) {
        // Create a new div element
        const reactBox = document.createElement("div");
        // Set the innerHTML of the new div element
        reactBox.innerHTML = `
          <h2>React Box</h2>
          <p>This is a React Box component</p>
        `;
        // Append the new div element to the container element
        this.containerRef.appendChild(reactBox);
      }
    }
  }
}

// Register the custom element
if (!customElements.get("react-box")) {
  customElements.define("react-box", ReactBox);
}
