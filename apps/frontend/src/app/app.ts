import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MainLayoutComponent } from './shared/components/layout/main-layout/main-layout.component';
import { LeadCaptureFormComponent } from './features/leads/components/lead-capture-form/lead-capture-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MainLayoutComponent, LeadCaptureFormComponent],
  template: `
    <app-main-layout>
      <div class="max-w-2xl mx-auto">
        <app-lead-capture-form></app-lead-capture-form>
      </div>
    </app-main-layout>
  `
})
export class App {

}
