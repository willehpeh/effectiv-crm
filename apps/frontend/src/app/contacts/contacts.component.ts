import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent } from '../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    RouterLink,
    ContactsListComponent
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

			<app-contacts-list />
		</div>
  `
})
export class ContactsComponent {
}
