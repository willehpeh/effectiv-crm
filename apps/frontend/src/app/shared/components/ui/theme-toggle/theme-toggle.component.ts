import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LightThemeIconComponent } from '../icons/light-theme-icon.component';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LightThemeIconComponent],
  template: `
    <button 
      aria-label="Toggle theme"
      class="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/50">
      <app-light-theme-icon/>
    </button>
  `
})
export class ThemeToggleComponent {
}
