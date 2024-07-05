import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./capitals.component').then((e) => e.CapitalsComponent),
    children: [
      {
        path: '',
        redirectTo: 'europe',
        pathMatch: 'full',
      },
      {
        path: 'europe',
        loadComponent: () =>
          import('./maps/europe/europe.component').then(
            (e) => e.EuropeComponent
          ),
      },
    ],
  },
] satisfies Routes;
