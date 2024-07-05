import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'base' },
  {
    path: 'base',
    loadChildren: () => import('./base/base.routes'),
  },
];
