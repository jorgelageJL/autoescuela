import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAdministradorPage } from './list-administrador.page';

const routes: Routes = [
  {
    path: '',
    component: ListAdministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAdministradorPageRoutingModule {}
