import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, SidebarComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <app-header></app-header>
      
      <div class="flex h-[calc(100vh-64px)]">
        <app-sidebar></app-sidebar>
        
        <main class="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-12">
          <ng-content></ng-content>
        </main>
      </div>
    </div>
  `
})
export class MainLayoutComponent {
}
