import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'operator', pathMatch: 'full' },
  { path: 'operator', loadComponent: () => import('../components/operator') },
];
