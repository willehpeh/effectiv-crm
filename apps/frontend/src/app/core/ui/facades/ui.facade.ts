import { Signal } from '@angular/core';

export type Theme = 'light' | 'dark';

export abstract class UiFacade {
  abstract toggleMenu(): void;
  abstract menuOpen(): Signal<boolean>;
  abstract menuFocused(): Signal<boolean>;
  abstract toggleTheme(): void;
  abstract theme(): Signal<Theme>;
}
