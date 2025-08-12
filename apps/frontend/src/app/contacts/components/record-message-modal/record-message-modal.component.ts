import { Component, ChangeDetectionStrategy, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ContactReadModel } from '@effectiv-crm/application';
import { ButtonComponent } from '../../../shared/components';
import { ContactsFacade } from '../../facades/contacts.facade';
import { Actions, ofType } from '@ngrx/effects';
import { RecordMessageSentSuccess, RecordMessageSentFailure } from '../../state/contacts.actions';
import { takeUntil, Subject } from 'rxjs';

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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
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
        <div class="space-y-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Message Channel</mat-label>
            <mat-select formControlName="messageChannel" required>
              <mat-option value="email">Email</mat-option>
              <mat-option value="phone">Phone</mat-option>
              <mat-option value="sms">SMS</mat-option>
              <mat-option value="linkedin">LinkedIn</mat-option>
              <mat-option value="in-person">In Person</mat-option>
              <mat-option value="other">Other</mat-option>
            </mat-select>
            @if (messageForm.get('messageChannel')?.invalid && messageForm.get('messageChannel')?.touched) {
              <mat-error>Message channel is required</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Subject</mat-label>
            <input
              matInput
              formControlName="subject"
              placeholder="Subject of the message"
              required
            />
            @if (messageForm.get('subject')?.invalid && messageForm.get('subject')?.touched) {
              <mat-error>Subject is required</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Body (optional)</mat-label>
            <textarea
              matInput
              formControlName="body"
              rows="3"
              placeholder="Content of the message..."
            ></textarea>
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Notes (optional)</mat-label>
            <textarea
              matInput
              formControlName="notes"
              rows="2"
              placeholder="Additional notes about this message..."
            ></textarea>
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Date & Time Sent</mat-label>
            <input
              matInput
              type="datetime-local"
              formControlName="sentAt"
              required
            />
            @if (messageForm.get('sentAt')?.invalid && messageForm.get('sentAt')?.touched) {
              <mat-error>Date and time is required</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <app-button
            variant="ghost"
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

    ::ng-deep .mat-mdc-form-field {
      --mdc-filled-text-field-container-color: transparent;
      --mdc-outlined-text-field-outline-color: rgb(148 163 184);
      --mdc-outlined-text-field-hover-outline-color: rgb(100 116 139);
      --mdc-outlined-text-field-focus-outline-color: rgb(34 197 94);
    }

    ::ng-deep .dark .mat-mdc-form-field {
      --mdc-outlined-text-field-outline-color: rgb(100 116 139);
      --mdc-outlined-text-field-hover-outline-color: rgb(148 163 184);
      --mdc-outlined-text-field-focus-outline-color: rgb(34 197 94);
    }

    ::ng-deep .mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {
      color: rgb(34 197 94);
    }

    ::ng-deep .mat-mdc-text-field-wrapper {
      background-color: transparent;
    }

    ::ng-deep .mdc-text-field--outlined .mdc-text-field__input {
      color: rgb(15 23 42);
    }

    ::ng-deep .dark .mdc-text-field--outlined .mdc-text-field__input {
      color: rgb(248 250 252);
    }

    ::ng-deep .mat-mdc-form-field-label {
      color: rgb(100 116 139);
    }

    ::ng-deep .dark .mat-mdc-form-field-label {
      color: rgb(148 163 184);
    }

    ::ng-deep .mat-mdc-form-field-subscript-wrapper {
      color: rgb(148 163 184);
    }

    ::ng-deep .dark .mat-mdc-form-field-subscript-wrapper {
      color: rgb(148 163 184);
    }

    ::ng-deep .mat-mdc-form-field-error {
      color: rgb(239 68 68) !important;
    }

    ::ng-deep .mat-mdc-select-panel {
      background-color: white;
    }

    ::ng-deep .dark .mat-mdc-select-panel {
      background-color: rgb(30 41 59);
    }

    ::ng-deep .mat-mdc-option {
      color: rgb(15 23 42);
    }

    ::ng-deep .dark .mat-mdc-option {
      color: rgb(248 250 252);
    }

    ::ng-deep .mat-mdc-option:hover {
      background-color: rgb(241 245 249);
    }

    ::ng-deep .dark .mat-mdc-option:hover {
      background-color: rgb(51 65 85);
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
