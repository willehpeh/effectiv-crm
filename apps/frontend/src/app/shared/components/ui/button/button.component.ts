import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button 
      [type]="type()"
      [disabled]="disabled()"
      [class]="buttonClasses()"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'primary' | 'secondary' | 'outline' | 'ghost'>('primary');

  buttonClasses = computed(() => {
    const baseClasses = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]';
    
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };

    const variantClasses = {
      primary: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 focus:ring-emerald-500/30 shadow-lg shadow-emerald-500/25',
      secondary: 'bg-gradient-to-r from-slate-700 to-slate-600 text-white hover:from-slate-800 hover:to-slate-700 focus:ring-slate-500/30 shadow-lg shadow-slate-500/25',
      outline: 'border border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800/50 focus:ring-slate-500/30 backdrop-blur-sm',
      ghost: 'bg-transparent text-slate-300 hover:bg-slate-800/50 focus:ring-slate-500/30'
    };

    return `${baseClasses} ${sizeClasses[this.size()]} ${variantClasses[this.variant()]}`;
  });
}
