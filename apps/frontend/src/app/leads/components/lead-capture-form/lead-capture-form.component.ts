import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardComponent } from '../../../shared/components/ui/card/card.component';
import { LabelComponent } from '../../../shared/components/ui/label/label.component';
import { InputComponent } from '../../../shared/components/ui/input/input.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { CardHeadingDirective } from '../../../shared/components/ui/card/card-heading.directive';
import { CardHeaderComponent } from '../../../shared/components/ui/card/card-header.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-lead-capture-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, LabelComponent, InputComponent, ButtonComponent, CardHeadingDirective, CardHeaderComponent],
  template: `
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
					Save Lead
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
  `
})
export class LeadCaptureFormComponent {
  private router = inject(Router);

  onCancel(): void {
    this.router.navigate(['/leads']);
  }

  onSave(): void {
    // TODO: Save lead
  }
}
