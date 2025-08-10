import { Route } from '@angular/router';
import { contactsProviders } from './contacts/contacts.providers';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.dashboardRoutes)
  },

  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.routes').then(m => m.contactsRoutes),
    providers: contactsProviders
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.routes').then(m => m.projectsRoutes)
  },
  {
    path: 'analytics',
    loadChildren: () => import('./analytics/analytics.routes').then(m => m.analyticsRoutes)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.routes').then(m => m.settingsRoutes)
  }
];
