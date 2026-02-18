import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProfesorsPage } from './list-profesors.page';

const routes: Routes = [
  {
    path: '',
    component: ListProfesorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListProfesorsPageRoutingModule {}
