import { Routes } from '@angular/router';
import { ExperienceComponent } from './experience/experience.component';

export const routes: Routes = [
    { path: 'home', loadComponent: () => import('./app.component').then(m => m.AppComponent) },
  ];
