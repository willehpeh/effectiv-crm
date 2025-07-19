import { Signal } from '@angular/core';

export abstract class UiFacade {
  abstract toggleMenu(): void;
  abstract menuOpen(): Signal<boolean>;
}
