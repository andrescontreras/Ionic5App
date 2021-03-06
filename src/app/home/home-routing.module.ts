import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'folder/:id',
        loadChildren: () => import('../pages/folder/folder.module').then(m => m.FolderPageModule)
      },
      {
        path: 'listado/:id',
        loadChildren: () => import('../pages/listado/listado.module').then(m => m.ListadoPageModule)
      },
      {
        path: 'detalle/:id',
        loadChildren: () => import('../pages/detalle/detalle.module').then(m => m.DetallePageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../pages/account/account.module').then(m => m.AccountPageModule)
      },
      { path: '', redirectTo: 'home/listado/pending', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
