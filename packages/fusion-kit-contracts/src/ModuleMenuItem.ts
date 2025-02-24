//The `ModuleMenuItem` interface defines the structure for a menu item within a module.
//This includes properties for the item's identifier, title, execution capability, icon, execution function, and any sub-menu items.
export interface ModuleMenuItem {
  id: string;
  title: string;
  canExecute: boolean;
  icon: string;
  execute: () => void;
  menuItems: ModuleMenuItem[];
}
