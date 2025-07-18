import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <app-header></app-header>
      
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ng-content></ng-content>
      </main>
    </div>
  `
})
export class MainLayoutComponent {
}
