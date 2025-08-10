import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, viewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { UiFacade } from '../../facades/ui.facade';
import { SidebarMenuItemComponent } from './sidebar-menu-item/sidebar-menu-item.component';
import { MenuItem } from './menu-item';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SidebarMenuItemComponent],
  host: {
    'class': 'flex-shrink-0 w-full md:w-64 h-full transition-width duration-300 ease-in-out md:relative absolute z-50 block',
  },
  template: `
		@if (menuOpen()) {
			<aside
					role="region"
					aria-label="Main navigation"
					tabindex="-1"
					#sidebar
					class="w-full h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md md:border-r border-slate-200 dark:border-slate-700/50 transition-opacity duration-300 ease-in-out"
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

					@if (settingsMenuItems().length > 0) {
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
					}
				</div>
			</aside>
		}
  `
})
export class SidebarComponent {
private uiFacade = inject(UiFacade);
private router = inject(Router);

protected menuOpen = this.uiFacade.menuOpen();

  private sidebar = viewChild<ElementRef<HTMLElement>>('sidebar');
  private focus = this.uiFacade.menuFocused();

  private currentRoute = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ),
    { initialValue: new NavigationEnd(0, this.router.url, this.router.url) }
  );

  constructor() {
    effect(() => {
      if (this.focus() && this.sidebar()) {
        this.sidebar()?.nativeElement.focus();
      }
    });
  }

  private baseMainMenuItems = [
    new MenuItem({ icon: 'dashboard', label: 'Dashboard', route: '/dashboard' }),
    new MenuItem({ icon: 'contacts', label: 'Contacts', route: '/contacts' }),
  ];

  private baseSettingsMenuItems: MenuItem[] = [];

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
