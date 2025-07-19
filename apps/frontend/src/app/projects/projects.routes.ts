import { Route } from '@angular/router';

export const projectsRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./projects.component').then(m => m.ProjectsComponent)
  }
];
