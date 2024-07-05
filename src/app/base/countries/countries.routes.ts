import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./countries.component').then((e) => e.CountriesComponent),
    children: [
      {
        path: '',
        redirectTo: 'europe',
        pathMatch: 'full',
      },
      {
        path: 'europe',
        loadComponent: () =>
          import('./maps/europe/europe.component').then((e) => e.EuropeComponent),
      },
      {
        path: 'africa',
        loadComponent: () =>
          import('./maps/africa/africa.component').then((e) => e.AfricaComponent),
      },
    ],
  },
] satisfies Routes;
