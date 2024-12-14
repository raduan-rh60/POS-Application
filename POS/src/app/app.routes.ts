import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { UsersComponent } from './pages/company/users/users.component';
import { ProfileComponent } from './pages/company/profile/profile.component';
import { AuthGuard } from 'src/authentication/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
        canActivate: [AuthGuard],
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./pages/product-sales/product-component.routes').then(
            (m) => m.ProductComponent
          ),
          canActivate: [AuthGuard],
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./pages/product-info/product-info.routes').then(
            (m) => m.ProductComponent
          ),
          canActivate: [AuthGuard],
      },
      {
        path: 'relation',
        loadChildren: () =>
          import('./pages/people/relation.routes').then(
            (m) => m.RelationComponent
          ),
          canActivate: [AuthGuard],
      },
      {path:'users', component:UsersComponent, canActivate: [AuthGuard],},
      {path:'profile', component:ProfileComponent, canActivate: [AuthGuard],},
      
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
