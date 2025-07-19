import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UiFacade } from '../../../../core/ui/ui.facade';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <app-header/>
      
      <div class="flex h-[calc(100vh-64px)]" [class.overflow-hidden]="menuOpen()">
        
        <div 
          class="flex-shrink-0 transition-width duration-300 ease-in-out md:relative absolute z-10"
          [class.w-0]="!menuOpen()"
          [class.w-full]="menuOpen()"
          [class.md:w-64]="menuOpen()"
        >
          <app-sidebar/>
        </div>
        
        <main class="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 transition-width duration-300 ease-in-out">
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
