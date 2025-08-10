import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LightThemeIconComponent } from '../icons/light-theme-icon.component';
import { DarkThemeIconComponent } from '../icons/dark-theme-icon.component';
import { UiFacade } from '../../../core/ui/facades/ui.facade';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LightThemeIconComponent, DarkThemeIconComponent],
  template: `
    <button 
      (click)="toggleTheme()"
      [attr.aria-label]="'Switch to ' + (theme() === 'light' ? 'dark' : 'light') + ' mode'"
      class="cursor-pointer p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/50">
      @if (theme() === 'light') {
        <app-dark-theme-icon/>
      } @else {
        <app-light-theme-icon/>
      }
    </button>
  `
})
export class ThemeToggleComponent {
  private uiFacade = inject(UiFacade);

  protected theme = this.uiFacade.theme();

  protected toggleTheme(): void {
    this.uiFacade.toggleTheme();
  }
}
