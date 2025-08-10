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
      [attr.aria-label]="'Switch to ' + (isDark() ? 'light' : 'dark') + ' mode'"
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

  constructor() {
    // Initialize theme on component load
    if (typeof document !== 'undefined') {
      // Check saved preference or system preference
      let isDarkMode = false;
      
      try {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light') {
          isDarkMode = saved === 'dark';
        } else {
          // Fall back to system preference
          isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
      } catch (e) {
        // localStorage not available, check system preference
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      // Apply theme
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      this.isDark.set(isDarkMode);
    }
  }

  protected toggleTheme(): void {
    console.log('Theme toggle clicked!');
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      const newDarkMode = !html.classList.contains('dark');
      
      console.log('Current dark mode:', html.classList.contains('dark'), 'New dark mode:', newDarkMode);
      
      if (newDarkMode) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
      
      console.log('HTML classes after toggle:', html.className);
      
      this.isDark.set(newDarkMode);
      
      // Save preference
      try {
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
      } catch (e) {
        // localStorage not available
      }
    }
  }
}
