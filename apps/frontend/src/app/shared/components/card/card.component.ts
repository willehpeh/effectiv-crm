import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="cardClasses()">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {
  padding = input<'sm' | 'md' | 'lg'>('md');
  shadow = input<'sm' | 'md' | 'lg' | 'xl'>('md');

  cardClasses = computed(() => {
    const baseClasses = 'bg-white dark:bg-slate-900/50 sm:rounded-2xl border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm space-y-8';

    const paddingClasses = {
      sm: 'p-4',
      md: 'p-8',
      lg: 'p-10'
    };

    const shadowClasses = {
      sm: 'shadow-sm',
      md: 'shadow-xl shadow-slate-900/10',
      lg: 'shadow-2xl shadow-slate-900/20',
      xl: 'shadow-2xl shadow-slate-900/25'
    };

    return `${baseClasses} ${paddingClasses[this.padding()]} ${shadowClasses[this.shadow()]}`;
  });
}
