import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';

@Component({
  selector: 'app-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label 
      [for]="htmlFor()"
      [class]="labelClasses()"
    >
      <ng-content></ng-content>
      @if (required()) {
        <span class="text-red-500 ml-1">*</span>
      }
    </label>
  `
})
export class LabelComponent {
  htmlFor = input<string>('');
  required = input<boolean>(false);
  size = input<'sm' | 'md' | 'lg'>('md');

  labelClasses = computed(() => {
    const baseClasses = 'block font-medium text-slate-700 dark:text-slate-300';
    
    const sizeClasses = {
      sm: 'text-sm mb-2',
      md: 'text-base mb-3',
      lg: 'text-lg mb-4'
    };

    return `${baseClasses} ${sizeClasses[this.size()]}`;
  });
}
