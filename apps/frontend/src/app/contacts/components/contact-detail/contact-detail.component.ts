import { Component, ChangeDetectionStrategy, inject, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardComponent } from '../../../shared/components';
import { ContactsFacade } from '../../facades/contacts.facade';
import { ContactReadModel } from '@effectiv-crm/application';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <button
          (click)="onBack()"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Contacts
        </button>
      </div>

      @if (contact()) {
        <app-card padding="lg">
          <div class="space-y-6">
            <div class="flex items-start space-x-6">
              <div class="flex-shrink-0">
                <div class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-2xl">
                  {{getInitials(contact()!.name)}}
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {{contact()!.name}}
                </h1>
                <p class="text-lg text-slate-600 dark:text-slate-400 mt-1">
                  {{contact()!.email}}
                </p>
                @if (contact()!.company) {
                  <p class="text-md text-slate-500 dark:text-slate-500 mt-2">
                    {{contact()!.company}}
                  </p>
                }
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  Contact Information
                </h3>
                <dl class="space-y-2">
                  <div>
                    <dt class="text-sm font-medium text-slate-500 dark:text-slate-400">Email</dt>
                    <dd class="text-sm text-slate-900 dark:text-slate-100">{{contact()!.email}}</dd>
                  </div>
                  @if (contact()!.company) {
                    <div>
                      <dt class="text-sm font-medium text-slate-500 dark:text-slate-400">Company</dt>
                      <dd class="text-sm text-slate-900 dark:text-slate-100">{{contact()!.company}}</dd>
                    </div>
                  }
                  <div>
                    <dt class="text-sm font-medium text-slate-500 dark:text-slate-400">Last Contacted</dt>
                    <dd class="text-sm text-slate-900 dark:text-slate-100">{{formatLastContacted(contact()!.lastContacted)}}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  Actions
                </h3>
                <div class="space-y-2">
                  <button class="w-full px-4 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    Send Message
                  </button>
                  <button class="w-full px-4 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    Edit Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </app-card>
      } @else {
        <app-card padding="lg">
          <div class="text-center py-8">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <svg class="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
              Contact not found
            </h3>
            <p class="text-slate-500 dark:text-slate-400">
              The contact you're looking for doesn't exist or couldn't be loaded.
            </p>
          </div>
        </app-card>
      }
    </div>
  `
})
export class ContactDetailComponent implements OnInit {
  protected contactsFacade = inject(ContactsFacade);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  contactId = this.route.snapshot.paramMap.get('id');
  contact = computed(() => {
    const id = this.contactId;
    return id ? this.contactsFacade.contacts().find(c => c.id === id) : undefined;
  });

  ngOnInit(): void {
    this.contactsFacade.loadContacts();
  }

  onBack(): void {
    this.router.navigate(['/contacts']);
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
      return 'Not contacted yet';
    }
    
    const date = new Date(lastContacted);
    return date.toLocaleDateString();
  }
}
