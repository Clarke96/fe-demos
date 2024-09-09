import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full',
  },
  { path: 'landing', loadComponent: () => import('../components/landing') },
  { path: 'basic-defer', loadComponent: () => import('../components/basic-defer') },
];
