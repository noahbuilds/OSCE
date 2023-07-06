import { DashboardComponent } from './pages/dashboards/dashboard/dashboard.component';
// import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';

// Auth
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  
  // {
  //   path: 'authenticate',
  //   loadChildren: () =>
  //     import('./authentication/authentication.module').then(
  //       (m) => m.AuthenticationModule
  //     ),
  // },
  //{ path: 'pages', loadChildren: () => import('./extraspages/extraspages.module').then(m => m.ExtraspagesModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
