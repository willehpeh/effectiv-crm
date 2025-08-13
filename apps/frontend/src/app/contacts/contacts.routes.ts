import { Route } from '@angular/router';

export const contactsRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./contacts.component').then(m => m.ContactsComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./components/contact-registration-form/contact-registration-form.component').then(m => m.ContactRegistrationFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./components/contact-detail/contact-detail.component').then(m => m.ContactDetailComponent)
  }
];
