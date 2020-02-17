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
        loadChildren: () =>
          import('../pages/folder/folder.module').then(m => m.FolderPageModule)
      },
      {
        path: 'bienvenida',
        loadChildren: () =>
          import('../pages/bienvenida/bienvenida.module').then(
            m => m.BienvenidaPageModule
          )
      },
      {
        path: 'listado',
        loadChildren: () =>
          import('../pages/listado/listado.module').then(
            m => m.ListadoPageModule
          )
      },
      {
        path: 'detalle',
        loadChildren: () =>
          import('../pages/detalle/detalle.module').then(
            m => m.DetallePageModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
