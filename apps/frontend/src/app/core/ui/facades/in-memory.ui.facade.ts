import { inject, Injectable, Signal, signal } from '@angular/core';
import { UiFacade } from './ui.facade';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable()
export class InMemoryUiFacade implements UiFacade {

  private device = inject(DeviceDetectorService);

  private _menuOpen = signal(!this.device.isMobile());
  private _menuFocused = signal(false);

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
}
