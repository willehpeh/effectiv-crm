import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThemeToggleComponent } from '../../ui/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThemeToggleComponent],
  template: `
    <header class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg shadow-slate-900/5 border-b border-slate-200 dark:border-slate-700/50 px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Effectiv CRM
        </h1>
        <app-theme-toggle/>
      </div>
    </header>
  `
})
export class HeaderComponent {
}
