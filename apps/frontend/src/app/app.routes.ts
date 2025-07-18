import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  { 
    path: 'leads', 
    loadComponent: () => import('./pages/leads/leads.component').then(m => m.LeadsComponent)
  },
  { 
    path: 'contacts', 
    loadComponent: () => import('./pages/contacts/contacts.component').then(m => m.ContactsComponent)
  },
  { 
    path: 'projects', 
    loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent)
  },
  { 
    path: 'analytics', 
    loadComponent: () => import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent)
  },
  { 
    path: 'settings', 
    loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent)
  }
];
