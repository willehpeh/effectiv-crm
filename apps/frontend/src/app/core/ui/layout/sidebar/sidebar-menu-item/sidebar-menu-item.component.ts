import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiFacade } from '../../../ui.facade';
import { DashboardIconComponent } from '../../../../../shared/components/icons/dashboard-icon.component';
import { LeadsIconComponent } from '../../../../../shared/components/icons/leads-icon.component';
import { ContactsIconComponent } from '../../../../../shared/components/icons/contacts-icon.component';
import { ProjectsIconComponent } from '../../../../../shared/components/icons/projects-icon.component';
import { AnalyticsIconComponent } from '../../../../../shared/components/icons/analytics-icon.component';
import { SettingsIconComponent } from '../../../../../shared/components/icons/settings-icon.component';
import { DeviceDetectorService } from 'ngx-device-detector';

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
    SettingsIconComponent,
    RouterLinkActive
  ],
  template: `
    <a 
      [class]="linkClasses()"
      [routerLink]="route()"
      routerLinkActive="text-emerald-700 dark:text-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-700/50"
      [routerLinkActiveOptions]="{ exact: false }"
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
  route = input.required<string>();
  active = input<boolean>(false);

  protected linkClasses = computed(() => {
    return 'flex items-center px-4 py-3 text-slate-700 rounded-xl hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900';
  });

  protected iconClasses = computed(() => {
    const baseClasses = 'w-5 h-5';
    const defaultClasses = 'text-slate-500 transition duration-200 group-hover:text-emerald-600 dark:text-slate-400 dark:group-hover:text-emerald-400';

    return `${baseClasses} ${defaultClasses}`;
  });

  protected labelClasses = computed(() => {
    return 'ml-3 font-medium';
  });

  private device = inject(DeviceDetectorService);

  private isMobile(): boolean {
    return this.device.isMobile();
  }

  protected onMenuItemClick(): void {
    if (this.isMobile() && this.uiFacade.menuOpen()()) {
      this.uiFacade.toggleMenu();
    }
  }
}

