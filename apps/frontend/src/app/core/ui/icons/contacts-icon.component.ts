import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-contacts-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg class="w-5 h-5" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  `
})
export class ContactsIconComponent {
}
