import { ChangeDetectionStrategy, Component, computed, input, signal, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
		<input
				[id]="id()"
				[type]="type()"
				[placeholder]="placeholder()"
				[class]="inputClasses()"
				[disabled]="isDisabled()"
				[value]="value()"
				(input)="onInput($event)"
				(blur)="onTouched()"
		/>
  `
})
export class InputComponent implements ControlValueAccessor {
  id = input<string>('');
  type = input<string>('text');
  placeholder = input<string>('');
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'default' | 'error'>('default');

  value = signal<string>('');
  isDisabled = signal<boolean>(false);

  protected onChange = (value: string) => {
    // required method for ControlValueAccessor
  };
  protected onTouched = () => {
    // required method for ControlValueAccessor
  };

  inputClasses = computed(() => {
    const baseClasses = 'w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 backdrop-blur-sm dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-50 placeholder-slate-500';

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg'
    };

    const variantClasses = {
      default: 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/30 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/30 hover:border-slate-400 dark:hover:border-slate-600',
      error: 'border-red-300 focus:border-red-500 focus:ring-red-500/30 dark:border-red-600 dark:focus:border-red-400 dark:focus:ring-red-400/30'
    };

    const disabledClasses = this.isDisabled() ? 'opacity-50 cursor-not-allowed' : '';

    return `${baseClasses} ${sizeClasses[this.size()]} ${variantClasses[this.variant()]} ${disabledClasses}`;
  });

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    this.value.set(newValue);
    this.onChange(newValue);
  }

  // ControlValueAccessor implementation
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
