import { Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [adminGuard],
    children: [
      {
        path: 'orders',
        loadComponent: () =>
          import('./orders/orders.component').then(m => m.OrdersComponent)
      },
      {
        path: 'menu',
        loadComponent: () =>
          import('./menu/menu.component').then(m => m.MenuComponent)
      },
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full'
      }
    ]
  }
];