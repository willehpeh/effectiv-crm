import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { UiFacade } from '../../../../ui/ui.facade';
import { MenuIconComponent } from '../icons/menu-icon.component';

@Component({
  selector: 'app-menu-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuIconComponent],
  template: `
		<button
				(click)="onToggleMenu()"
				[attr.aria-expanded]="menuOpen()"
				[attr.aria-label]="menuOpen() ? 'Close navigation menu' : 'Open navigation menu'"
				class="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/50"
		>
			<app-menu-icon [isOpen]="menuOpen()"/>
		</button>
  `
})
export class MenuToggleComponent {
  private uiFacade = inject(UiFacade);
  protected menuOpen = this.uiFacade.menuOpen();

  onToggleMenu(): void {
    this.uiFacade.toggleMenu();
  }
}
