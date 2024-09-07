import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  {
    path: 'home',
    loadComponent: () => import('../components/home'),
  },
  {
    path: 'cart',
    loadComponent: () => import('../components/cart'),
  },
  { path: 'artist', loadComponent: () => import('../components/artist') },
];
