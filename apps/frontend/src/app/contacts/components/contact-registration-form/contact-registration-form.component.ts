import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ButtonComponent,
  CardComponent,
  CardHeaderComponent,
  CardHeadingDirective,
  FormFieldComponent,
  InputComponent
} from '../../../shared/components';

import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-registration-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, FormFieldComponent, InputComponent, ButtonComponent, CardHeadingDirective, CardHeaderComponent, ReactiveFormsModule],
  template: `
		<div class="py-4 sm:py-8 sticky top-0 z-30 bg-slate-50 dark:bg-slate-950">
			<div class="px-4 flex justify-between">
				<h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
					New Contact
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

			<div [formGroup]="contactForm" class="space-y-8">
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

				<app-form-field label="Company (Optional)" fieldId="company">
					<app-input
							id="company"
							type="text"
							placeholder="Better Fries Ltd."
							formControlName="company"
					></app-input>
				</app-form-field>
			</div>
		</app-card>
  `
})
export class ContactRegistrationFormComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  
  contactForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    company: ['']
  });

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }

  onSave(): void {
    if (!this.contactForm.valid) {
      return;
    }
    const formValue = this.contactForm.value;
    console.log('Contact form submitted:', formValue);
  }
}
