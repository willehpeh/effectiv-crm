import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg shadow-slate-900/5 border-b border-slate-200 dark:border-slate-700/50">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                EffectiV CRM
              </h1>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <button class="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/50">
              <svg class="h-5 w-5" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
}
