import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardComponent } from '../../../shared/components/ui/card/card.component';
import { LabelComponent } from '../../../shared/components/ui/label/label.component';
import { InputComponent } from '../../../shared/components/ui/input/input.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { CardHeadingDirective } from '../../../shared/components/ui/card/card-heading.directive';
import { CardHeaderComponent } from '../../../shared/components/ui/card/card-header.component';
import { TextareaComponent } from '../../../shared/components/ui/textarea/textarea.component';
import { SelectComponent, SelectOption } from '../../../shared/components/ui/select/select.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-lead-capture-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, LabelComponent, InputComponent, ButtonComponent, CardHeadingDirective, CardHeaderComponent, TextareaComponent, SelectComponent],
  template: `
		<div class="p-8">
			<div class="flex justify-between items-center mb-8">
				<h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">
					New Lead
				</h1>
				<div class="flex gap-4">
					<app-button
							type="button"
							variant="outline"
							size="md"
							(click)="onCancel()"
					>
						Cancel
					</app-button>
					<app-button
							type="submit"
							variant="primary"
							size="md"
							(click)="onSave()"
					>
						Save
					</app-button>
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
						<app-label htmlFor="firstName" [required]="true">
							First Name
						</app-label>
						<app-input
								id="firstName"
								type="text"
								placeholder="James"
						></app-input>
					</div>

					<div>
						<app-label htmlFor="lastName" [required]="true">
							Last Name
						</app-label>
						<app-input
								id="lastName"
								type="text"
								placeholder="Anderson"
						></app-input>
					</div>

					<div>
						<app-label htmlFor="email" [required]="true">
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

		<app-card shadow="xl" class="mt-6">
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
						placeholder="Select lead source"
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
	</div>
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

  onCancel(): void {
    this.router.navigate(['/leads']);
  }

  onSave(): void {
    // TODO: Save lead
  }
}
