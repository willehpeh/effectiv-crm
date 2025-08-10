import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { LightThemeIconComponent } from '../icons/light-theme-icon.component';
import { DarkThemeIconComponent } from '../icons/dark-theme-icon.component';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LightThemeIconComponent, DarkThemeIconComponent],
  template: `
    <button 
      (click)="toggleTheme()"
      class="cursor-pointer p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/50">
      @if (isDark()) {
        <app-light-theme-icon/>
      } @else {
        <app-dark-theme-icon/>
      }
    </button>
  `
})
export class ThemeToggleComponent {
  protected isDark = signal(false);

  protected toggleTheme(): void {
    document.documentElement.classList.toggle('dark');
    this.isDark.update(val => !val);
  }
}
