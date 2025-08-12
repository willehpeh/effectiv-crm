import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CardComponent } from '../../../shared/components';
import { ContactsFacade } from '../../facades/contacts.facade';
import { ContactReadModel } from '@effectiv-crm/application';
import { RecordMessageModalComponent } from '../record-message-modal/record-message-modal.component';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, MatDialogModule],
  template: `
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-100">
          All Contacts
        </h2>
        <span class="text-sm text-slate-500 dark:text-slate-400">
          {{contactsFacade.contacts().length}} contacts
        </span>
      </div>

      @if (contactsFacade.contacts().length === 0 && !contactsFacade.loading()) {
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
        @if (contactsFacade.loading()) {
          <app-card padding="lg">
            <div class="text-center py-8">
              <div class="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                <span class="sr-only">Loading...</span>
              </div>
              <p class="mt-4 text-slate-600 dark:text-slate-400">Loading contacts...</p>
            </div>
          </app-card>
        } @else {
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            @for (contact of contactsFacade.contacts(); track contact.id) {
            <app-card padding="md" shadow="sm">
              <div class="space-y-3">
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
                    @if (contact.company) {
                      <p class="text-xs text-slate-500 dark:text-slate-500 truncate mt-1">
                        {{contact.company}}
                      </p>
                    }
                    <p class="text-xs text-slate-500 dark:text-slate-500 truncate mt-1">
                      Last contacted: {{formatLastContacted(contact.lastContacted)}}
                    </p>
                  </div>
                </div>
                <div class="flex justify-end">
                  <button
                    (click)="onRecordMessage(contact)"
                    class="inline-flex items-center px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    title="Record message sent"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Record Message
                  </button>
                </div>
              </div>
            </app-card>
            }
          </div>
        }
      }

      @if (contactsFacade.error()) {
        <app-card padding="lg">
          <div class="text-center py-8">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
              Error loading contacts
            </h3>
            <p class="text-slate-500 dark:text-slate-400 mb-4">
              {{contactsFacade.error()}}
            </p>
            <button
              (click)="contactsFacade.loadContacts()"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try again
            </button>
          </div>
        </app-card>
      }
    </div>
  `
})
export class ContactsListComponent implements OnInit {
  protected contactsFacade = inject(ContactsFacade);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.contactsFacade.loadContacts();
  }

  onRecordMessage(contact: ContactReadModel): void {
    this.dialog.open(RecordMessageModalComponent, {
      data: { contact },
      width: '500px',
      disableClose: false,
    });
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  }

  formatLastContacted(lastContacted?: string): string {
    if (!lastContacted) {
      return 'not contacted yet';
    }
    
    const date = new Date(lastContacted);
    return date.toISOString().split('T')[0];
  }
}
