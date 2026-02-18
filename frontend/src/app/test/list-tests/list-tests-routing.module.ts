import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTestsPage } from './list-tests.page';

const routes: Routes = [
  {
    path: '',
    component: ListTestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListTestsPageRoutingModule {}
