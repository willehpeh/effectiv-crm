import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, viewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { UiFacade } from '../../../../ui/ui.facade';
import { animate, style, transition, trigger } from '@angular/animations';
import { SidebarMenuItemComponent } from './sidebar-menu-item/sidebar-menu-item.component';
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
    <aside 
      role="region"
      aria-label="Main navigation"
      tabindex="-1"
      #sidebar
      class="w-full h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md md:border-r border-slate-200 dark:border-slate-700/50 transition-opacity duration-300 ease-in-out"
      [class.opacity-0]="!menuOpen()"
      [class.opacity-100]="menuOpen()"
    >
      <div class="h-full px-3 py-6 overflow-y-auto">
        <nav class="space-y-2">
          @for (item of mainMenuItems(); track item.label) {
            <app-sidebar-menu-item 
              [icon]="item.icon" 
              [label]="item.label" 
              [route]="item.route"
              [active]="item.active"/>
          }
        </nav>
      
      <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50">
        <nav class="space-y-2">
          @for (item of settingsMenuItems(); track item.icon) {
            <app-sidebar-menu-item 
              [icon]="item.icon" 
              [label]="item.label" 
              [route]="item.route"
              [active]="item.active"/>
          }
        </nav>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {
private uiFacade = inject(UiFacade);
private router = inject(Router);

protected menuOpen = this.uiFacade.menuOpen();

  private sidebar = viewChild<ElementRef<HTMLElement>>('sidebar');

  // Track current route for active state
  private currentRoute = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ),
    { initialValue: new NavigationEnd(0, this.router.url, this.router.url) }
  );

  constructor() {
    // Focus management: when sidebar opens, focus it for keyboard users
    effect(() => {
      if (this.menuOpen() && this.sidebar()) {
        // Small delay to ensure DOM is ready after animation
        setTimeout(() => {
          this.sidebar()?.nativeElement.focus();
        }, 100);
      }
    });
  }

  // Base menu items without active state
  private baseMainMenuItems = [
    new MenuItem({ icon: 'dashboard', label: 'Dashboard', route: '/dashboard' }),
    new MenuItem({ icon: 'leads', label: 'Leads', route: '/leads' }),
    new MenuItem({ icon: 'contacts', label: 'Contacts', route: '/contacts' }),
    new MenuItem({ icon: 'projects', label: 'Projects', route: '/projects' }),
    new MenuItem({ icon: 'analytics', label: 'Analytics', route: '/analytics' }),
  ];

  private baseSettingsMenuItems = [
    new MenuItem({ icon: 'settings', label: 'Settings', route: '/settings' }),
  ];

  // Computed menu items with dynamic active state
  protected mainMenuItems = computed(() => {
    const currentUrl = (this.currentRoute() as NavigationEnd)?.url || '/';
    return this.baseMainMenuItems.map(item =>
      new MenuItem({
        ...item,
        active: currentUrl === item.route
      })
    );
  });

  protected settingsMenuItems = computed(() => {
    const currentUrl = (this.currentRoute() as NavigationEnd)?.url || '/';
    return this.baseSettingsMenuItems.map(item =>
      new MenuItem({
        ...item,
        active: currentUrl === item.route
      })
    );
  });
}
