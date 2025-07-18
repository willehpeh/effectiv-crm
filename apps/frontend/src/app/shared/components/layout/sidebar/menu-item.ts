import type { SidebarIcon } from '../../ui/sidebar-menu-item/sidebar-menu-item.component';

export class MenuItem {
  icon: SidebarIcon;
  label: string;
  href: string;
  active: boolean;

  constructor(options: {
    icon: SidebarIcon;
    label: string;
    href?: string;
    active?: boolean;
  }) {
    this.icon = options.icon;
    this.label = options.label;
    this.href = options.href ?? '#';
    this.active = options.active ?? false;
  }
}
