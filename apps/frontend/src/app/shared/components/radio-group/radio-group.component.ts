import { Component, ChangeDetectionStrategy, computed, input, signal, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface RadioOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-radio-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ],
  template: `
    <div [class]="containerClasses()">
      @for (option of options(); track option.value) {
        <label [class]="labelClasses()">
          <input 
            type="radio"
            [name]="name()"
            [value]="option.value"
            [checked]="value() === option.value"
            [disabled]="isDisabled()"
            [class]="radioClasses()"
            (change)="onValueChange(option.value)"
            (blur)="onTouched()"
          />
          <span [class]="textClasses()">{{ option.label }}</span>
        </label>
      }
    </div>
  `
})
export class RadioGroupComponent implements ControlValueAccessor {
  name = input.required<string>();
  options = input<RadioOption[]>([]);
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  size = input<'sm' | 'md' | 'lg'>('md');

  value = signal<string>('');
  isDisabled = signal<boolean>(false);

  protected onChange = (value: string) => {
    // required method for ControlValueAccessor
  };
  protected onTouched = () => {
    // required method for ControlValueAccessor
  };

  containerClasses = computed(() => {
    const baseClasses = 'flex gap-4';
    const orientationClasses = {
      horizontal: 'flex-row',
      vertical: 'flex-col'
    };
    return `${baseClasses} ${orientationClasses[this.orientation()]}`;
  });

  labelClasses = computed(() => {
    const baseClasses = 'flex items-center gap-2 cursor-pointer transition-all duration-200';
    const disabledClasses = this.isDisabled() ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80';
    return `${baseClasses} ${disabledClasses}`;
  });

  radioClasses = computed(() => {
    const baseClasses = 'rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950';
    
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    const colorClasses = 'border-slate-300 text-emerald-600 focus:border-emerald-500 focus:ring-emerald-500/30 dark:border-slate-600 dark:text-emerald-400 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/30';
    
    const disabledClasses = this.isDisabled() ? 'cursor-not-allowed' : '';

    return `${baseClasses} ${sizeClasses[this.size()]} ${colorClasses} ${disabledClasses}`;
  });

  textClasses = computed(() => {
    const baseClasses = 'select-none';
    
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    };

    const colorClasses = 'text-slate-700 dark:text-slate-300';

    return `${baseClasses} ${sizeClasses[this.size()]} ${colorClasses}`;
  });

  onValueChange(value: string): void {
    if (!this.isDisabled()) {
      this.value.set(value);
      this.onChange(value);
    }
  }

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
