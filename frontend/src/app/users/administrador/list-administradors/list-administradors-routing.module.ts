import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAdministradorsPage } from './list-administradors.page';

const routes: Routes = [
  {
    path: '',
    component: ListAdministradorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAdministradorsPageRoutingModule {}
