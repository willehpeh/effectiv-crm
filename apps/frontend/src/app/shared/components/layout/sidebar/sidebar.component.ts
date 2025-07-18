import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="w-64 h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-r border-slate-200 dark:border-slate-700/50">
      <div class="h-full px-3 py-6 overflow-y-auto">
        <nav class="space-y-2">
          <a 
            href="#" 
            class="flex items-center px-4 py-3 text-slate-700 rounded-xl hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 transition-all duration-200 group"
          >
            <svg class="w-5 h-5 text-slate-500 transition duration-200 group-hover:text-emerald-600 dark:text-slate-400 dark:group-hover:text-emerald-400" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"/>
            </svg>
            <span class="ml-3 font-medium">Dashboard</span>
          </a>
          
          <a 
            href="#" 
            class="flex items-center px-4 py-3 text-slate-700 rounded-xl hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 transition-all duration-200 group bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-700/50"
          >
            <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span class="ml-3 font-medium text-emerald-700 dark:text-emerald-300">Leads</span>
          </a>
          
          <a 
            href="#" 
            class="flex items-center px-4 py-3 text-slate-700 rounded-xl hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 transition-all duration-200 group"
          >
            <svg class="w-5 h-5 text-slate-500 transition duration-200 group-hover:text-emerald-600 dark:text-slate-400 dark:group-hover:text-emerald-400" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <span class="ml-3 font-medium">Contacts</span>
          </a>
          
          <a 
            href="#" 
            class="flex items-center px-4 py-3 text-slate-700 rounded-xl hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 transition-all duration-200 group"
          >
            <svg class="w-5 h-5 text-slate-500 transition duration-200 group-hover:text-emerald-600 dark:text-slate-400 dark:group-hover:text-emerald-400" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            <span class="ml-3 font-medium">Projects</span>
          </a>
          
          <a 
            href="#" 
            class="flex items-center px-4 py-3 text-slate-700 rounded-xl hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 transition-all duration-200 group"
          >
            <svg class="w-5 h-5 text-slate-500 transition duration-200 group-hover:text-emerald-600 dark:text-slate-400 dark:group-hover:text-emerald-400" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            <span class="ml-3 font-medium">Analytics</span>
          </a>
        </nav>
        
        <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50">
          <nav class="space-y-2">
            <a 
              href="#" 
              class="flex items-center px-4 py-3 text-slate-700 rounded-xl hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 transition-all duration-200 group"
            >
              <svg class="w-5 h-5 text-slate-500 transition duration-200 group-hover:text-emerald-600 dark:text-slate-400 dark:group-hover:text-emerald-400" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="ml-3 font-medium">Settings</span>
            </a>
          </nav>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {
}
