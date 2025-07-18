import { Component, ChangeDetectionStrategy, input, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiFacade } from '../../../../../ui/ui.facade';
import { DashboardIconComponent } from '../../../ui/icons/dashboard-icon.component';
import { LeadsIconComponent } from '../../../ui/icons/leads-icon.component';
import { ContactsIconComponent } from '../../../ui/icons/contacts-icon.component';
import { ProjectsIconComponent } from '../../../ui/icons/projects-icon.component';
import { AnalyticsIconComponent } from '../../../ui/icons/analytics-icon.component';
import { SettingsIconComponent } from '../../../ui/icons/settings-icon.component';

export type SidebarIcon = 'dashboard' | 'leads' | 'contacts' | 'projects' | 'analytics' | 'settings';

@Component({
  selector: 'app-sidebar-menu-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    DashboardIconComponent,
    LeadsIconComponent,
    ContactsIconComponent,
    ProjectsIconComponent,
    AnalyticsIconComponent,
    SettingsIconComponent
  ],
  template: `
    <a 
      [routerLink]="route()"
      [class]="linkClasses()"
      [attr.aria-current]="active() ? 'page' : null"
      (click)="onMenuItemClick()"
    >
      @switch (icon()) {
        @case ('dashboard') {
          <app-dashboard-icon [class]="iconClasses()"/>
        }
        @case ('leads') {
          <app-leads-icon [class]="iconClasses()"/>
        }
        @case ('contacts') {
          <app-contacts-icon [class]="iconClasses()"/>
        }
        @case ('projects') {
          <app-projects-icon [class]="iconClasses()"/>
        }
        @case ('analytics') {
          <app-analytics-icon [class]="iconClasses()"/>
        }
        @case ('settings') {
          <app-settings-icon [class]="iconClasses()"/>
        }
      }
      <span [class]="labelClasses()">{{ label() }}</span>
    </a>
  `
})
export class SidebarMenuItemComponent {
  private uiFacade = inject(UiFacade);
  
  icon = input.required<SidebarIcon>();
  label = input.required<string>();
  route = input<string>('#');
  active = input<boolean>(false);

  protected linkClasses = computed(() => {
    const baseClasses = 'flex items-center px-4 py-3 text-slate-700 rounded-xl hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 transition-all duration-200 group';
    const activeClasses = 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-700/50';

    return this.active() ? `${baseClasses} ${activeClasses}` : baseClasses;
  });

  protected iconClasses = computed(() => {
    const baseClasses = 'w-5 h-5';
    const defaultClasses = 'text-slate-500 transition duration-200 group-hover:text-emerald-600 dark:text-slate-400 dark:group-hover:text-emerald-400';
    const activeClasses = 'text-emerald-600 dark:text-emerald-400';

    return this.active() ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${defaultClasses}`;
  });

  protected labelClasses = computed(() => {
    const baseClasses = 'ml-3 font-medium';
    const activeClasses = 'text-emerald-700 dark:text-emerald-300';

    return this.active() ? `${baseClasses} ${activeClasses}` : baseClasses;
  });

  private isMobile(): boolean {
    // Check if screen width is below md breakpoint (768px)
    return window.innerWidth < 768;
  }

  protected onMenuItemClick(): void {
    // Close sidebar when menu item is clicked, but only on mobile devices
    // On desktop, keep the sidebar open for better UX
    if (this.isMobile() && this.uiFacade.menuOpen()()) {
      this.uiFacade.toggleMenu();
    }
  }
}

