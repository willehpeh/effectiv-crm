import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ContactReadModel } from '@effectiv-crm/application';
import { ButtonComponent } from '../../../shared/components';
import { ContactsFacade } from '../../facades/contacts.facade';

export interface RecordMessageModalData {
  contact: ContactReadModel;
}

export interface RecordMessageFormData {
  messageChannel: string;
  messageContent: string;
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
    <div class="p-6">
      <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Record Message Sent
      </h2>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-6">
        Recording message sent to <strong>{{data.contact.name}}</strong>
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
            <mat-label>Message Content (optional)</mat-label>
            <textarea
              matInput
              formControlName="messageContent"
              rows="3"
              placeholder="Brief description of the message..."
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
    ::ng-deep .mat-mdc-form-field {
      --mdc-filled-text-field-container-color: transparent;
      --mdc-outlined-text-field-outline-color: rgb(148 163 184);
      --mdc-outlined-text-field-hover-outline-color: rgb(100 116 139);
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

    ::ng-deep .mat-mdc-form-field-subscript-wrapper {
      color: rgb(148 163 184);
    }

    ::ng-deep .dark .mat-mdc-form-field-subscript-wrapper {
      color: rgb(148 163 184);
    }

    ::ng-deep .mat-mdc-form-field-error {
      color: rgb(239 68 68) !important;
    }
  `]
})
export class RecordMessageModalComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<RecordMessageModalComponent>);
  protected data = inject(MAT_DIALOG_DATA) as RecordMessageModalData;
  private contactsFacade = inject(ContactsFacade);

  isSubmitting = false;

  messageForm: FormGroup = this.fb.group({
    messageChannel: ['email', Validators.required],
    messageContent: [''],
    sentAt: [this.getCurrentDateTime(), Validators.required]
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.messageForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const formData: RecordMessageFormData = this.messageForm.value;
      
      this.contactsFacade.recordMessageSent(
        this.data.contact.id,
        formData.messageChannel,
        formData.messageContent || undefined,
        formData.sentAt
      );

      this.dialogRef.close(formData);
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
