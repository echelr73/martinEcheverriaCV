import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'home', loadComponent: () => import('./app.component').then(m => m.AppComponent) },
    // Añade otras rutas aquí
  ];
