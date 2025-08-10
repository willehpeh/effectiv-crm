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
    this.initializeTheme();
  }

  private initializeTheme(): void {
    if (typeof window === 'undefined') return;

    const savedTheme = this.getSavedTheme();
    const shouldUseDark = savedTheme !== null 
      ? savedTheme === 'dark'
      : this.getSystemPreference();

    this.applyTheme(shouldUseDark);
  }

  private getSavedTheme(): 'light' | 'dark' | null {
    try {
      const theme = localStorage.getItem('theme');
      return theme === 'light' || theme === 'dark' ? theme : null;
    } catch {
      return null;
    }
  }

  private getSystemPreference(): boolean {
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    this.isDark.set(isDark);
  }

  private saveTheme(theme: 'light' | 'dark'): void {
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // localStorage not available
    }
  }

  protected toggleTheme(): void {
    const newIsDark = !this.isDark();
    this.applyTheme(newIsDark);
    this.saveTheme(newIsDark ? 'dark' : 'light');
  }
}
