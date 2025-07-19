import { Route } from '@angular/router';

export const analyticsRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./analytics.component').then(m => m.AnalyticsComponent)
  }
];
