import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'europe' },
  {
    path: 'europe',
    loadComponent: () =>
      import('./europe/europe.component').then((e) => e.EuropeComponent),
  },
  {
    path: 'africa',
    loadComponent: () =>
      import('./africa/africa.component').then((e) => e.AfricaComponent),
  },
];
