import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexPage } from './index.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPage,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../pages/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'login',
        loadChildren: () =>
          import('../pages/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'bienvenida',
        loadChildren: () =>
          import('../pages/bienvenida/bienvenida.module').then(
            m => m.BienvenidaPageModule
          )
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('../pages/signup/signup.module').then(m => m.SignupPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/index/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexPageRoutingModule {}
