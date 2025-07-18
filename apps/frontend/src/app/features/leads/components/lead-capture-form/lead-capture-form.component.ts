
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CardComponent } from '../../../../shared/components/ui/card/card.component';
import { LabelComponent } from '../../../../shared/components/ui/label/label.component';
import { InputComponent } from '../../../../shared/components/ui/input/input.component';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-lead-capture-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, LabelComponent, InputComponent, ButtonComponent],
  template: `
    <app-card shadow="xl">
      <div class="space-y-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
            New Lead
          </h2>
          <p class="text-slate-600 dark:text-slate-400 text-lg">
            Capture potential client information
          </p>
        </div>

        <form class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <app-label htmlFor="firstName" [required]="true">
                First Name
              </app-label>
              <app-input 
                type="text" 
                placeholder="James"
              ></app-input>
            </div>
            
            <div>
              <app-label htmlFor="lastName" [required]="true">
                Last Name
              </app-label>
              <app-input 
                type="text" 
                placeholder="Anderson"
              ></app-input>
            </div>
          </div>

          <div>
            <app-label htmlFor="email" [required]="true">
              Email Address
            </app-label>
            <app-input 
              type="email" 
              placeholder="james@example.com"
            ></app-input>
          </div>

          <div>
            <app-label htmlFor="phone">
              Phone Number
            </app-label>
            <app-input 
              type="tel" 
              placeholder="06 12 34 56 78"
            ></app-input>
          </div>

          <div>
            <app-label htmlFor="company">
              Company
            </app-label>
            <app-input 
              type="text" 
              placeholder="Better Fries Ltd."
            ></app-input>
          </div>

          <div>
            <app-label htmlFor="jobTitle">
              Job Title
            </app-label>
            <app-input 
              type="text" 
              placeholder="Enter job title"
            ></app-input>
          </div>

          <div>
            <app-label htmlFor="notes">
              Notes
            </app-label>
            <textarea 
              id="notes"
              rows="4"
              placeholder="Additional notes about the lead..."
              class="w-full px-4 py-3 text-base rounded-xl border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 focus:outline-none focus:ring-offset-2 focus:ring-offset-slate-950 dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-50 dark:placeholder-slate-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/30 transition-all duration-200 backdrop-blur-sm hover:border-slate-600"
            ></textarea>
          </div>

          <div class="flex gap-4">
            <app-button 
              type="submit" 
              variant="primary" 
              size="md"
            >
              Save Lead
            </app-button>
            
            <app-button 
              type="button" 
              variant="outline" 
              size="md"
            >
              Cancel
            </app-button>
          </div>
        </form>
      </div>
    </app-card>
  `
})
export class LeadCaptureFormComponent {
}
