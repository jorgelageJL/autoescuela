import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProfesorPage } from './list-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: ListProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListProfesorPageRoutingModule {}
