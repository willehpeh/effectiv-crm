import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterContactDto, ContactReadModel } from '@effectiv-crm/application';
import { Observable } from 'rxjs';

@Injectable()
export class ContactsApiService {
  private http = inject(HttpClient);

  registerContact(newContact: RegisterContactDto): Observable<void> {
    return this.http.post<void>('/api/contacts/register', newContact);
  }

  loadContacts(): Observable<ContactReadModel[]> {
    return this.http.get<ContactReadModel[]>('/api/contacts');
  }

  recordMessageSent(data: { contactId: string; subject: string; body?: string; messageChannel: string; notes?: string; sentAt: string }): Observable<void> {
    return this.http.post<void>('/api/contacts/message-sent', data);
  }
}
