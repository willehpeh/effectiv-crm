import { Component, ChangeDetectionStrategy, inject, OnInit, computed, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil, Subject } from 'rxjs';
import { CardComponent } from '../../../shared/components';
import { 
  ButtonComponent,
  FormFieldComponent,
  InputComponent,
  SelectComponent,
  TextareaComponent
} from '../../../shared/components';
import { ContactsFacade } from '../../facades/contacts.facade';

import { RecordMessageSentSuccess, RecordMessageSentFailure } from '../../state/contacts.actions';
import { SelectOption } from '../../../shared/components/form-field/select/select.component';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    ReactiveFormsModule,
    FormFieldComponent,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    ButtonComponent
  ],
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
          </div>
        </app-card>

        <app-card padding="lg">
          <div class="space-y-6">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Record Message Sent
            </h3>
            <form [formGroup]="messageForm" (ngSubmit)="onSubmit()" class="space-y-4">
              <app-form-field label="Message Channel" fieldId="messageChannel">
                <app-select
                  id="messageChannel"
                  placeholder="Select a channel"
                  [options]="channelOptions"
                  formControlName="messageChannel"
                ></app-select>
              </app-form-field>

              <app-form-field label="Subject" fieldId="subject">
                <app-input
                  id="subject"
                  type="text"
                  placeholder="Subject of the message"
                  formControlName="subject"
                ></app-input>
              </app-form-field>

              <app-form-field label="Body (optional)" fieldId="body">
                <app-textarea
                  id="body"
                  [rows]="3"
                  placeholder="Content of the message..."
                  formControlName="body"
                ></app-textarea>
              </app-form-field>

              <app-form-field label="Notes (optional)" fieldId="notes">
                <app-textarea
                  id="notes"
                  [rows]="2"
                  placeholder="Additional notes about this message..."
                  formControlName="notes"
                ></app-textarea>
              </app-form-field>

              <app-form-field label="Date & Time Sent" fieldId="sentAt">
                <app-input
                  id="sentAt"
                  type="datetime-local"
                  formControlName="sentAt"
                ></app-input>
              </app-form-field>

              <div class="flex justify-end space-x-3 pt-4">
                <app-button
                  variant="outline"
                  type="button"
                  size="sm"
                  (click)="onResetForm()"
                >
                  Reset
                </app-button>
                <app-button
                  variant="primary"
                  type="submit"
                  size="sm"
                  [disabled]="messageForm.invalid || isSubmitting"
                >
                  {{isSubmitting ? 'Recording...' : 'Record Message'}}
                </app-button>
              </div>
            </form>
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
export class ContactDetailComponent implements OnInit, OnDestroy {
  protected contactsFacade = inject(ContactsFacade);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private actions$ = inject(Actions);

  private destroy$ = new Subject<void>();
  isSubmitting = false;

  contactId = this.route.snapshot.paramMap.get('id');
  contact = computed(() => {
    const id = this.contactId;
    return id ? this.contactsFacade.contacts().find(c => c.id === id) : undefined;
  });

  channelOptions: SelectOption[] = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'sms', label: 'SMS' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'in-person', label: 'In Person' },
    { value: 'other', label: 'Other' }
  ];

  messageForm: FormGroup = this.fb.group({
    messageChannel: ['email', Validators.required],
    subject: ['', Validators.required],
    body: [''],
    notes: [''],
    sentAt: [this.getCurrentDateTime(), Validators.required]
  });

  constructor() {
    this.actions$.pipe(
      ofType(RecordMessageSentSuccess, RecordMessageSentFailure),
      takeUntil(this.destroy$)
    ).subscribe((action) => {
      this.isSubmitting = false;
      if (action.type === RecordMessageSentSuccess.type) {
        this.onResetForm();
      }
    });
  }

  ngOnInit(): void {
    this.contactsFacade.loadContacts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  onSubmit(): void {
    const currentContact = this.contact();
    if (this.messageForm.valid && !this.isSubmitting && currentContact) {
      this.isSubmitting = true;
      const formData = this.messageForm.value;
      
      this.contactsFacade.recordMessageSent(
        currentContact.id,
        formData.subject,
        formData.body || undefined,
        formData.messageChannel,
        formData.notes || undefined,
        formData.sentAt
      );
    }
  }

  onResetForm(): void {
    this.messageForm.reset({
      messageChannel: 'email',
      subject: '',
      body: '',
      notes: '',
      sentAt: this.getCurrentDateTime()
    });
  }

  private getCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
