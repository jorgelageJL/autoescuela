import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HacerTestPage } from './hacer-test.page';

const routes: Routes = [
  {
    path: '',
    component: HacerTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HacerTestPageRoutingModule {}
