//The `Module` interface defines the structure for loaded a module,

import { ModuleConfiguration } from '.';
import { ModuleMenuItem } from './ModuleMenuItem';

//including its identifier, title, description, menu items, and methods for mounting and unmounting the module.
export interface Module {
  name: string;
  title: string;
  description: string;
  menuItems: ModuleMenuItem[];
  mount(container: string | HTMLElement, moduleConfiguration?: ModuleConfiguration): void;
  unmount(): void;
}
