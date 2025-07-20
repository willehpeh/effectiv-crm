import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UiFacade } from '../../facades/ui.facade';
import { RouterOutlet } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
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
		<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
			<app-header/>

			<div class="flex h-[calc(100vh-64px)] relative" [class.overflow-hidden]="menuOpen()">

				@if (menuOpen()) {
					<app-sidebar @slideIn/>
				}

				<main class="flex-1 overflow-y-auto sm:px-6 lg:px-8 transition-width duration-300 ease-in-out">
					<router-outlet/>
				</main>

			</div>
		</div>
  `
})
export class MainLayoutComponent {
  protected uiFacade = inject(UiFacade);
  protected menuOpen = this.uiFacade.menuOpen();
}
