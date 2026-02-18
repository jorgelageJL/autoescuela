import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAlumnosPage } from './list-alumnos.page';

const routes: Routes = [
  {
    path: '',
    component: ListAlumnosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAlumnosPageRoutingModule {}
