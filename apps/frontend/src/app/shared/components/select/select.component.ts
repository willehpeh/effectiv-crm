import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative">
      <select 
        [id]="id()"
        [class]="selectClasses()"
        [disabled]="disabled()"
      >
        <option value="" disabled selected>{{ placeholder() }}</option>
        @for (option of options(); track option.value) {
          <option [value]="option.value">{{ option.label }}</option>
        }
      </select>
      
      <!-- Custom dropdown arrow -->
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg 
          class="w-5 h-5 text-slate-400 dark:text-slate-500" 
          [class.opacity-50]="disabled()"
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </div>
  `
})
export class SelectComponent {
  id = input<string>('');
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  options = input<SelectOption[]>([]);
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'default' | 'error'>('default');

  selectClasses = computed(() => {
    const baseClasses = 'w-full rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 backdrop-blur-sm dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-50 appearance-none bg-white dark:bg-slate-900';

    const sizeClasses = {
      sm: 'pl-3 pr-10 py-2 text-sm',
      md: 'pl-4 pr-12 py-3 text-base',
      lg: 'pl-5 pr-14 py-4 text-lg'
    };

    const variantClasses = {
      default: 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/30 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/30 hover:border-slate-400 dark:hover:border-slate-600',
      error: 'border-red-300 focus:border-red-500 focus:ring-red-500/30 dark:border-red-600 dark:focus:border-red-400 dark:focus:ring-red-400/30'
    };

    const disabledClasses = this.disabled() ? 'opacity-50 cursor-not-allowed' : '';

    return `${baseClasses} ${sizeClasses[this.size()]} ${variantClasses[this.variant()]} ${disabledClasses}`;
  });
}
