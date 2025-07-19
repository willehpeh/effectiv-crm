import { Injectable, Signal, signal } from '@angular/core';
import { UiFacade } from './ui.facade';

@Injectable()
export class InMemoryUiFacade implements UiFacade {

  private _menuOpen = signal(false);

  toggleMenu(): void {
    this._menuOpen.update(menuOpen => !menuOpen);
  }

  menuOpen(): Signal<boolean> {
    return this._menuOpen.asReadonly();
  }
}
