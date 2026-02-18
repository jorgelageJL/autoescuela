import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListResultadosPage } from './list-resultados.page';

const routes: Routes = [
  {
    path: '',
    component: ListResultadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListResultadosPageRoutingModule {}
