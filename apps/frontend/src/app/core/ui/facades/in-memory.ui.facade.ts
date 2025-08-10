import { inject, Injectable, Signal, signal, effect } from '@angular/core';
import { UiFacade, Theme } from './ui.facade';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable()
export class InMemoryUiFacade implements UiFacade {

  private device = inject(DeviceDetectorService);

  private _menuOpen = signal(!this.device.isMobile());
  private _menuFocused = signal(false);
  private _theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Apply theme changes to the document
    effect(() => {
      const theme = this._theme();
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      // Persist theme preference
      localStorage.setItem('theme', theme);
    });
  }

  toggleMenu(): void {
    this._menuOpen.update(menuOpen => !menuOpen);
    this._menuFocused.set(this._menuOpen());
  }

  menuOpen(): Signal<boolean> {
    return this._menuOpen.asReadonly();
  }

  menuFocused(): Signal<boolean> {
    return this._menuFocused.asReadonly();
  }

  toggleTheme(): void {
    this._theme.update(theme => theme === 'light' ? 'dark' : 'light');
  }

  theme(): Signal<Theme> {
    return this._theme.asReadonly();
  }

  private getInitialTheme(): Theme {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    // Fall back to system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}
