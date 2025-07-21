import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ButtonComponent,
  CardComponent,
  CardHeaderComponent,
  CardHeadingDirective,
  InputComponent,
  LabelComponent,
  RadioGroupComponent,
  RadioOption,
  SelectComponent,
  SelectOption,
  TextareaComponent
} from '../../../shared/components';

import { Router } from '@angular/router';

@Component({
  selector: 'app-lead-capture-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, LabelComponent, InputComponent, ButtonComponent, CardHeadingDirective, CardHeaderComponent, TextareaComponent, SelectComponent, RadioGroupComponent],
  template: `
			<div class="py-4 sm:py-8 sticky top-0 z-30 bg-slate-50 dark:bg-slate-950">
				<div class="px-4 flex justify-between">
					<h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
						New Lead
					</h1>
					<div class="flex gap-3 justify-end sm:gap-4 sm:w-auto">
						<app-button
								type="button"
								variant="outline"
								size="sm"
								class="flex-none"
								(click)="onCancel()"
						>
							Cancel
						</app-button>
						<app-button
								type="submit"
								variant="primary"
								size="sm"
								class="flex-none"
								(click)="onSave()"
						>
							Save
						</app-button>
					</div>
				</div>
      </div>
				<app-card shadow="xl">
					<app-card-header>
						<h2 appCardHeading>
							Contact Information
						</h2>
					</app-card-header>

					<form class="space-y-8">
						<div>
							<app-label htmlFor="company">
								Company
							</app-label>
							<app-input
									id="company"
									type="text"
									placeholder="Better Fries Ltd."
							></app-input>
						</div>
						<div>
							<app-label htmlFor="firstName">
								First Name
							</app-label>
							<app-input
									id="firstName"
									type="text"
									placeholder="James"
							></app-input>
						</div>

						<div>
							<app-label htmlFor="lastName">
								Last Name
							</app-label>
							<app-input
									id="lastName"
									type="text"
									placeholder="Anderson"
							></app-input>
						</div>

						<div>
							<app-label htmlFor="email">
								Email Address
							</app-label>
							<app-input
									id="email"
									type="email"
									placeholder="james@example.com"
							></app-input>
						</div>


					</form>
				</app-card>

				<app-card shadow="xl" class="block mt-6 mb-12">
					<app-card-header>
						<h2 appCardHeading>
							Lead Details
						</h2>
					</app-card-header>

					<form class="space-y-8">
						<div>
							<app-label htmlFor="leadSource">
								Lead Source
							</app-label>
							<app-select
									id="leadSource"
									[options]="leadSourceOptions"
							></app-select>
						</div>
            
						<div>
							<app-label htmlFor="contactDate">
								Contact Date
							</app-label>
							<app-input
									id="contactDate"
									type="date"
							></app-input>
						</div>
            
						<div>
							<app-label htmlFor="contactType">
								Contact Type
							</app-label>
							<app-select
									id="contactType"
									[options]="contactTypeOptions"
							></app-select>
						</div>

						<div>
							<app-label>
								Was this lead a referral?
							</app-label>
							<app-radio-group
									name="isReferral"
									[options]="referralOptions"
									[value]="selectedReferralOption"
									(valueChange)="onReferralChange($event)"
							></app-radio-group>
						</div>

						<div>
							<app-label htmlFor="referrer">
								If so, by whom?
							</app-label>
							<app-input
									id="referrer"
									type="text"
									placeholder="John Smith"
							></app-input>
						</div>

						<div>
							<app-label htmlFor="leadDetails">
								Details Shared
							</app-label>
							<app-textarea
									id="leadDetails"
									placeholder="Any additional details the lead shared..."
									[rows]="4"
							></app-textarea>
						</div>
					</form>
				</app-card>
  `
})
export class LeadCaptureFormComponent {
  private router = inject(Router);

  leadSourceOptions: SelectOption[] = [
    { value: 'website', label: 'Website' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'referral', label: 'Referral' },
    { value: 'email-campaign', label: 'Email Campaign' },
    { value: 'cold-call', label: 'Cold Call' },
    { value: 'trade-show', label: 'Trade Show' },
    { value: 'advertising', label: 'Advertising' },
    { value: 'other', label: 'Other' }
  ];

  contactTypeOptions: SelectOption[] = [
    { value: 'phone', label: 'Phone' },
    { value: 'email', label: 'Email' },
    { value: 'in-person', label: 'In Person' },
    { value: 'other', label: 'Other' }
  ];

  referralOptions: RadioOption[] = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  selectedReferralOption = 'no';

  onReferralChange(value: string): void {
    this.selectedReferralOption = value;
  }

  onCancel(): void {
    this.router.navigate(['/leads']);
  }

  onSave(): void {
    // TODO: Save lead
  }
}
