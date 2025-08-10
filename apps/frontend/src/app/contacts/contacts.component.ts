import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent } from '../shared/components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contacts',
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
					Contacts
				</h1>
				<app-button
						type="button"
						variant="primary"
						size="sm"
            routerLink="new"
				>
					New Contact
				</app-button>
			</div>

			<div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
				<p class="text-slate-600 dark:text-slate-400">
					Contact management coming soon...
				</p>
			</div>
		</div>
  `
})
export class ContactsComponent {
}
