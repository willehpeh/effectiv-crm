import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input 
      [type]="type()"
      [placeholder]="placeholder()"
      [class]="inputClasses()"
      [disabled]="disabled()"
    />
  `
})
export class InputComponent {
  type = input<string>('text');
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'default' | 'error'>('default');

  inputClasses = computed(() => {
    const baseClasses = 'w-full rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 backdrop-blur-sm dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-50 dark:placeholder-slate-500';

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg'
    };

    const variantClasses = {
      default: 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/30 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/30 hover:border-slate-400 dark:hover:border-slate-600',
      error: 'border-red-300 focus:border-red-500 focus:ring-red-500/30 dark:border-red-600 dark:focus:border-red-400 dark:focus:ring-red-400/30'
    };

    const disabledClasses = this.disabled() ? 'opacity-50 cursor-not-allowed' : '';

    return `${baseClasses} ${sizeClasses[this.size()]} ${variantClasses[this.variant()]} ${disabledClasses}`;
  });
}
