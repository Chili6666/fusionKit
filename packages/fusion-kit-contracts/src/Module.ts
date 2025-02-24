import { ModuleConfiguration } from '.';
import { ModuleMenuItem } from './ModuleMenuItem';

/**
 * The `Module` interface defines the structure for bootstrapping a module.
 * It includes properties for the module's identifier, title, description, menu items,
 * and methods for mounting and unmounting the module.
 */
export interface Module {
  /**
   * The unique identifier for the module.
   */
  name: string;

  /**
   * The title of the module.
   */
  title: string;

  /**
   * A brief description of the module.
   */
  description: string;

  /**
   * An array of menu items associated with the module.
   */
  menuItems: ModuleMenuItem[];

  /**
   * Mounts the module to the specified container.
   * @param container - The container element or its ID where the module will be mounted.
   * @param moduleConfiguration - Optional configuration options for the module.
   */
  mount(container: string | HTMLElement, moduleConfiguration?: ModuleConfiguration): void;

  /**
   * Unmounts the module from the container.
   */
  unmount(): void;
}