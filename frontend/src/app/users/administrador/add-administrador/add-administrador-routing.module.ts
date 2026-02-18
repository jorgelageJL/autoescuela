import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAdministradorPage } from './add-administrador.page';

const routes: Routes = [
  {
    path: '',
    component: AddAdministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAdministradorPageRoutingModule {}
