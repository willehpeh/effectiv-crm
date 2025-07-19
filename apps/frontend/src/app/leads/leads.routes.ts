import { Route } from '@angular/router';

export const leadsRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./components/home/leads-home.component').then(m => m.LeadsHomeComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./components/lead-capture-form/lead-capture-form.component').then(m => m.LeadCaptureFormComponent)
  }
];
