import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./pages/menu/menu.component').then(m => m.MenuComponent),
    canActivate: [authGuard]
  },
  {path: '', redirectTo: 'menu', pathMatch: 'full'},
  { path: '**', redirectTo: 'login' }
];