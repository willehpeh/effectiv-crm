import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { LabelComponent } from './label/label.component';

@Component({
  selector: 'app-form-field',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LabelComponent],
  template: `
    <div>
      <app-label [htmlFor]="fieldId()">{{ label() }}</app-label>
      <ng-content></ng-content>
    </div>
  `
})
export class FormFieldComponent {
  label = input.required<string>();
  fieldId = input.required<string>();
}
