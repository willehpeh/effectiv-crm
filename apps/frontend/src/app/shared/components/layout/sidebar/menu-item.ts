import type { SidebarIcon } from './sidebar-menu-item/sidebar-menu-item.component';

export class MenuItem {
  icon: SidebarIcon;
  label: string;
  route: string;
  active: boolean;

  constructor(options: {
    icon: SidebarIcon;
    label: string;
    route?: string;
    active?: boolean;
  }) {
    this.icon = options.icon;
    this.label = options.label;
    this.route = options.route ?? '#';
    this.active = options.active ?? false;
  }
}
