import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.dashboardRoutes)
  },
  {
    path: 'leads',
    loadChildren: () => import('./leads/leads.routes').then(m => m.leadsRoutes)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.routes').then(m => m.contactsRoutes)
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
