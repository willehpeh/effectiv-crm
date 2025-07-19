import { Route } from '@angular/router';

export const contactsRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./contacts.component').then(m => m.ContactsComponent)
  }
];
