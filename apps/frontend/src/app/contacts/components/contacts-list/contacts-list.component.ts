import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ContactReadModel } from '@effectiv-crm/application';
import { CardComponent } from '../../../shared/components';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent],
  template: `
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-100">
          All Contacts
        </h2>
        <span class="text-sm text-slate-500 dark:text-slate-400">
          {{contacts.length}} contacts
        </span>
      </div>

      @if (contacts.length === 0) {
        <app-card padding="lg">
          <div class="text-center py-8">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <svg class="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
              No contacts yet
            </h3>
            <p class="text-slate-500 dark:text-slate-400">
              Start by adding your first contact.
            </p>
          </div>
        </app-card>
      } @else {
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          @for (contact of contacts; track contact.id) {
            <app-card padding="md" shadow="sm">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                    {{getInitials(contact.name)}}
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {{contact.name}}
                  </h3>
                  <p class="text-sm text-slate-600 dark:text-slate-400 truncate">
                    {{contact.email}}
                  </p>
                  <div class="mt-2 flex items-center text-xs text-slate-500 dark:text-slate-500">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </app-card>
          }
        </div>
      }
    </div>
  `
})
export class ContactsListComponent {
  // Dummy data for now - this will be replaced with real data later
  contacts: ContactReadModel[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com'
    },
    {
      id: '3',
      name: 'Michael Johnson',
      email: 'michael.johnson@example.com'
    },
    {
      id: '4',
      name: 'Emily Brown',
      email: 'emily.brown@example.com'
    },
    {
      id: '5',
      name: 'David Wilson',
      email: 'david.wilson@example.com'
    },
    {
      id: '6',
      name: 'Sarah Davis',
      email: 'sarah.davis@example.com'
    }
  ];

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  }
}
