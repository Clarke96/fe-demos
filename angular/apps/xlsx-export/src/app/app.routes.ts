import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/data',
  },
  { path: 'data', loadComponent: () => import('../components/data/') },
];
