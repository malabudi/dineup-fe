import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(m => m.RegisterComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./pages/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'menu',
        loadComponent: () =>
          import('./pages/menu/menu.component').then(m => m.MenuComponent)
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/orders/orders.component').then(m => m.OrdersComponent)
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent)
      },
      { path: '', redirectTo: 'menu', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];