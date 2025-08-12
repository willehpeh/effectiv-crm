import { Component, ChangeDetectionStrategy, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ContactReadModel } from '@effectiv-crm/application';
import { 
  ButtonComponent,
  FormFieldComponent,
  InputComponent,
  SelectComponent,
  TextareaComponent
} from '../../../shared/components';
import { ContactsFacade } from '../../facades/contacts.facade';
import { Actions, ofType } from '@ngrx/effects';
import { RecordMessageSentSuccess, RecordMessageSentFailure } from '../../state/contacts.actions';
import { takeUntil, Subject } from 'rxjs';
import { SelectOption } from '../../../shared/components/form-field/select/select.component';

export interface RecordMessageModalData {
  contact: ContactReadModel;
}

export interface RecordMessageFormData {
  subject: string;
  body?: string;
  messageChannel: string;
  notes?: string;
  sentAt: string;
}

@Component({
  selector: 'app-record-message-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    FormFieldComponent,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    ButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6 bg-white dark:bg-slate-800">
      <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Record Message Sent
      </h2>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-6">
        Recording message sent to <strong class="text-slate-900 dark:text-slate-100">{{data.contact.name}}</strong>
      </p>

      <form [formGroup]="messageForm" (ngSubmit)="onSubmit()">
        <div class="space-y-6">
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
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <app-button
            variant="outline"
            type="button"
            (click)="onCancel()"
          >
            Cancel
          </app-button>
          <app-button
            variant="primary"
            type="submit"
            [disabled]="messageForm.invalid || isSubmitting"
          >
            {{isSubmitting ? 'Recording...' : 'Record Message'}}
          </app-button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    ::ng-deep .mat-mdc-dialog-container {
      background-color: white;
    }

    ::ng-deep .dark .mat-mdc-dialog-container {
      background-color: rgb(30 41 59); /* slate-800 */
    }
  `]
})
export class RecordMessageModalComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<RecordMessageModalComponent>);
  protected data = inject(MAT_DIALOG_DATA) as RecordMessageModalData;
  private contactsFacade = inject(ContactsFacade);
  private actions$ = inject(Actions);

  private destroy$ = new Subject<void>();
  isSubmitting = false;

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
    // Listen for success/failure actions to close modal
    this.actions$.pipe(
      ofType(RecordMessageSentSuccess, RecordMessageSentFailure),
      takeUntil(this.destroy$)
    ).subscribe((action) => {
      this.isSubmitting = false;
      if (action.type === RecordMessageSentSuccess.type) {
        this.dialogRef.close(true);
      }
      // On failure, keep modal open to show error
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.messageForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const formData: RecordMessageFormData = this.messageForm.value;
      
      this.contactsFacade.recordMessageSent(
        this.data.contact.id,
        formData.subject,
        formData.body || undefined,
        formData.messageChannel,
        formData.notes || undefined,
        formData.sentAt
      );
    }
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
