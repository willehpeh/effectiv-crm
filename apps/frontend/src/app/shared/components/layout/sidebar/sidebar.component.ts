import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { UiFacade } from '../../../../ui/ui.facade';
import { DashboardIconComponent } from '../../ui/icons/dashboard-icon.component';
import { LeadsIconComponent } from '../../ui/icons/leads-icon.component';
import { ContactsIconComponent } from '../../ui/icons/contacts-icon.component';
import { ProjectsIconComponent } from '../../ui/icons/projects-icon.component';
import { AnalyticsIconComponent } from '../../ui/icons/analytics-icon.component';
import { SettingsIconComponent } from '../../ui/icons/settings-icon.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DashboardIconComponent, LeadsIconComponent, ContactsIconComponent, ProjectsIconComponent, AnalyticsIconComponent, SettingsIconComponent],
  template: `
    <aside [class]="sidebarClasses()">
      <div class="h-full px-3 py-6 overflow-y-auto">
        <nav class="space-y-2">
          <a 
            href="#" 
            class="flex items-center px-4 py-3 text-slate-700 rounded-xl hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 transition-all duration-200 group"
          >
            <app-dashboard-icon class="text-slate-500 transition duration-200 group-hover:text-emerald-600 dark:text-slate-400 dark:group-hover:text-emerald-400"/>
            <span class="ml-3 font-medium">Dashboard</span>
          </a>
          
          <a 
            href="#" 
            class="flex items-center px-4 py-3 text-slate-700 rounded-xl hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 transition-all duration-200 group bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-700/50"
          >
            <app-leads-icon class="text-emerald-600 dark:text-emerald-400"/>
            <span class="ml-3 font-medium text-emerald-700 dark:text-emerald-300">Leads</span>
          </a>
          
          <a 
            href="#" 
            class="flex items-center px-4 py-3 text-slate-700 rounded-xl hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 transition-all duration-200 group"
          >
            <app-contacts-icon class="text-slate-500 transition duration-200 group-hover:text-emerald-600 dark:text-slate-400 dark:group-hover:text-emerald-400"/>
            <span class="ml-3 font-medium">Contacts</span>
          </a>
          
          <a 
            href="#" 
            class="flex items-center px-4 py-3 text-slate-700 rounded-xl hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 transition-all duration-200 group"
          >
            <app-projects-icon class="text-slate-500 transition duration-200 group-hover:text-emerald-600 dark:text-slate-400 dark:group-hover:text-emerald-400"/>
            <span class="ml-3 font-medium">Projects</span>
          </a>
          
          <a 
            href="#" 
            class="flex items-center px-4 py-3 text-slate-700 rounded-xl hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 transition-all duration-200 group"
          >
            <app-analytics-icon class="text-slate-500 transition duration-200 group-hover:text-emerald-600 dark:text-slate-400 dark:group-hover:text-emerald-400"/>
            <span class="ml-3 font-medium">Analytics</span>
          </a>
        </nav>
        
        <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50">
          <nav class="space-y-2">
            <a 
              href="#" 
              class="flex items-center px-4 py-3 text-slate-700 rounded-xl hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 transition-all duration-200 group"
            >
              <app-settings-icon class="text-slate-500 transition duration-200 group-hover:text-emerald-600 dark:text-slate-400 dark:group-hover:text-emerald-400"/>
              <span class="ml-3 font-medium">Settings</span>
            </a>
          </nav>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  private uiFacade = inject(UiFacade);
  private menuOpen = this.uiFacade.menuOpen();
  
  protected sidebarClasses = computed(() => {
    const baseClasses = 'w-full md:w-64 h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md md:border-r border-slate-200 dark:border-slate-700/50 transition-transform duration-300 ease-in-out absolute z-10';
    return this.menuOpen() 
      ? `${baseClasses} transform translate-x-0`
      : `${baseClasses} transform -translate-x-full`;
  });
}
