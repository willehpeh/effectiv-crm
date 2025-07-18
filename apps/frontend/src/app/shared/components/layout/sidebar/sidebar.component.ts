import { ChangeDetectionStrategy, Component, inject, Signal, signal } from '@angular/core';
import { UiFacade } from '../../../../ui/ui.facade';
import { animate, style, transition, trigger } from '@angular/animations';
import { SidebarMenuItemComponent } from '../../ui/sidebar-menu-item/sidebar-menu-item.component';
import { MenuItem } from './menu-item';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SidebarMenuItemComponent],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ],
  template: `
    @if (menuOpen()) {
      <aside 
        [@slideIn] 
        class="w-full md:w-64 h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md md:border-r border-slate-200 dark:border-slate-700/50 absolute z-10"
      >
        <div class="h-full px-3 py-6 overflow-y-auto">
          <nav class="space-y-2">
            @for (item of mainMenuItems(); track item.label) {
              <app-sidebar-menu-item 
                [icon]="item.icon" 
                [label]="item.label" 
                [href]="item.href"
                [active]="item.active"/>
            }
          </nav>
        
        <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50">
          <nav class="space-y-2">
            @for (item of settingsMenuItems(); track item.icon) {
              <app-sidebar-menu-item 
                [icon]="item.icon" 
                [label]="item.label" 
                [href]="item.href"
                [active]="item.active"/>
            }
          </nav>
          </div>
        </div>
      </aside>
    }
  `
})
export class SidebarComponent {
  private uiFacade = inject(UiFacade);
  protected menuOpen = this.uiFacade.menuOpen();

  protected mainMenuItems: Signal<MenuItem[]> = signal([
    new MenuItem({ icon: 'dashboard', label: 'Dashboard' }),
    new MenuItem({ icon: 'leads', label: 'Leads', active: true }),
    new MenuItem({ icon: 'contacts', label: 'Contacts' }),
    new MenuItem({ icon: 'projects', label: 'Projects' }),
    new MenuItem({ icon: 'analytics', label: 'Analytics' }),
  ]);

  protected settingsMenuItems: Signal<MenuItem[]> = signal([
    new MenuItem({ icon: 'settings', label: 'Settings' }),
  ]);
}
