import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UiFacade } from '../../ui.facade';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <app-header/>
      
      <div class="flex h-[calc(100vh-64px)] relative" [class.overflow-hidden]="menuOpen()">
        
        <app-sidebar/>
        
        <main class="flex-1 overflow-y-auto sm:px-6 lg:px-8 transition-width duration-300 ease-in-out">
          <router-outlet/>
        </main>
        
      </div>
    </div>
  `
})
export class MainLayoutComponent {
  protected uiFacade = inject(UiFacade);
  protected menuOpen = this.uiFacade.menuOpen();
}
