import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ButtonComponent,
  CardComponent,
  CardHeaderComponent,
  CardHeadingDirective,
  FormFieldComponent,
  InputComponent,
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
  imports: [CardComponent, FormFieldComponent, InputComponent, ButtonComponent, CardHeadingDirective, CardHeaderComponent, TextareaComponent, SelectComponent, RadioGroupComponent, ReactiveFormsModule],
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
          
					<div [formGroup]="leadForm" class="space-y-8">
						<app-form-field label="Company" fieldId="company">
							<app-input
									id="company"
									type="text"
									placeholder="Better Fries Ltd."
									formControlName="company"
							></app-input>
						</app-form-field>

						<app-form-field label="First Name" fieldId="firstName">
							<app-input
									id="firstName"
									type="text"
									placeholder="James"
									formControlName="firstName"
							></app-input>
						</app-form-field>

						<app-form-field label="Last Name" fieldId="lastName">
							<app-input
									id="lastName"
									type="text"
									placeholder="Anderson"
									formControlName="lastName"
							></app-input>
						</app-form-field>

						<app-form-field label="Email Address" fieldId="email">
							<app-input
									id="email"
									type="email"
									placeholder="james@example.com"
									formControlName="email"
							></app-input>
						</app-form-field>
					</div>
				</app-card>

				<app-card shadow="xl" class="block mt-6 mb-12">
					<app-card-header>
						<h2 appCardHeading>
							Lead Details
						</h2>
					</app-card-header>

					<div [formGroup]="leadForm" class="space-y-8">
						<app-form-field label="Lead Source" fieldId="leadSource">
							<app-select
									id="leadSource"
									[options]="leadSourceOptions"
									formControlName="leadSource"
							></app-select>
						</app-form-field>
            
						<app-form-field label="Contact Date" fieldId="contactDate">
							<app-input
									id="contactDate"
									type="date"
									formControlName="contactDate"
							></app-input>
						</app-form-field>
            
						<app-form-field label="Contact Type" fieldId="contactType">
							<app-select
									id="contactType"
									[options]="contactTypeOptions"
									formControlName="contactType"
							></app-select>
						</app-form-field>

						<app-form-field label="Was this lead a referral?" fieldId="isReferral">
							<app-radio-group
									name="isReferral"
									[options]="referralOptions"
									formControlName="isReferral"
							></app-radio-group>
						</app-form-field>

						<app-form-field label="If so, by whom?" fieldId="referrer">
							<app-input
									id="referrer"
									type="text"
									placeholder="John Smith"
									formControlName="referrer"
							></app-input>
						</app-form-field>

						<app-form-field label="Details Shared" fieldId="leadDetails">
							<app-textarea
									id="leadDetails"
									placeholder="Any additional details the lead shared..."
									[rows]="4"
									formControlName="leadDetails"
							></app-textarea>
						</app-form-field>
					</div>
				</app-card>
  `
})
export class LeadCaptureFormComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);

  leadForm: FormGroup = this.fb.group({
    company: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    leadSource: ['', Validators.required],
    contactDate: ['', Validators.required],
    contactType: ['', Validators.required],
    isReferral: [false],
    referrer: [''],
    leadDetails: ['']
  });

  leadSourceOptions: SelectOption[] = [
    { value: 'website', label: 'Website' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'referral', label: 'Referral' },
    { value: 'email-campaign', label: 'Email Campaign' },
    { value: 'cold-call', label: 'Cold Call' },
    { value: 'conference', label: 'Conference' },
  ];

  contactTypeOptions: SelectOption[] = [
    { value: 'phone', label: 'Phone' },
    { value: 'email', label: 'Email' },
    { value: 'in-person', label: 'In Person' },
    { value: 'other', label: 'Other' }
  ];

  referralOptions: RadioOption[] = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
  ];

  onCancel(): void {
    this.router.navigate(['/leads']);
  }

  onSave(): void {
    if (this.leadForm.valid) {
      console.log('Form values:', this.leadForm.value);
      // TODO: Save lead
    }
  }
}
