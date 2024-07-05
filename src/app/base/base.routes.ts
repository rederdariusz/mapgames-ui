import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./base.component').then((b) => b.BaseComponent),
    children: [
      {
        path: '',
        redirectTo: 'countries',
        pathMatch: 'full',
      },
      {
        path: 'countries',
        loadChildren: () => import('./countries/countries.routes'),
      },
      {
        path: 'capitals',
        loadChildren: () => import('./capitals/capitals.routes'),
      },
    ],
  },
] satisfies Routes;
