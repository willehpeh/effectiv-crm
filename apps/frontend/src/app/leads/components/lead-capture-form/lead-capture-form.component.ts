import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/ui/card/card.component';
import { LabelComponent } from '../../../shared/components/ui/label/label.component';
import { InputComponent } from '../../../shared/components/ui/input/input.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { CardHeadingDirective } from '../../../shared/components/ui/card/card-heading.directive';
import { CardHeaderComponent } from '../../../shared/components/ui/card/card-header.component';
import { CardSubheadingDirective } from '../../../shared/components/ui/card/card-subheading.directive';

@Component({
  selector: 'app-lead-capture-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, LabelComponent, InputComponent, ButtonComponent, CardHeadingDirective, CardHeaderComponent, CardSubheadingDirective],
  template: `
		<app-card shadow="xl">
			<app-card-header>
				<h2 appCardHeading>
					New Lead
				</h2>
				<p appCardSubheading>
					Capture potential client information
				</p>
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

				<div>
					<app-label htmlFor="phone">
						Phone Number
					</app-label>
					<app-input
							id="phone"
							type="tel"
							placeholder="06 12 34 56 78"
					></app-input>
				</div>


				<div>
					<app-label htmlFor="jobTitle">
						Job Title
					</app-label>
					<app-input
							id="jobTitle"
							type="text"
							placeholder="CTO"
					></app-input>
				</div>

				<div>
					<app-label htmlFor="notes">
						Notes
					</app-label>
					<textarea
							id="notes"
							rows="4"
							placeholder="Tech stack, organizational structure, requirements…"
							class="w-full px-4 py-3 text-base rounded-xl border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 focus:outline-none focus:ring-offset-2 focus:ring-offset-slate-950 dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-50 dark:placeholder-slate-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/30 transition-all duration-200 backdrop-blur-sm hover:border-slate-600"
					></textarea>
				</div>

				<div class="flex justify-end gap-4">
					<app-button
							type="button"
							variant="outline"
							size="md"
					>
						Cancel
					</app-button>
					<app-button
							type="submit"
							variant="primary"
							size="md"
					>
						Save Lead
					</app-button>
				</div>
			</form>
		</app-card>
  `
})
export class LeadCaptureFormComponent {
}
