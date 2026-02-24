import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTestsPage } from './admin-tests.page';

const routes: Routes = [
  {
    path: '',
    component: AdminTestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTestsPageRoutingModule {}
