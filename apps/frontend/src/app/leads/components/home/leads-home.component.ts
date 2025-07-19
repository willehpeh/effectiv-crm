import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-leads',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    RouterLink
  ],
  template: `
		<div class="p-8">
			<div class="flex justify-between items-center mb-8">
				<h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">
					Leads
				</h1>
				<app-button
						type="button"
						variant="primary"
						size="md"
            routerLink="new"
				>
					New Lead
				</app-button>
			</div>

			<div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
				<p class="text-slate-600 dark:text-slate-400">
					Lead management coming soon...
				</p>
			</div>
		</div>
  `
})
export class LeadsHomeComponent {
}
