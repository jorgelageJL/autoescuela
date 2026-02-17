import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminTestsPageRoutingModule } from './admin-tests-routing.module';

import { AdminTestsPage } from './admin-tests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminTestsPageRoutingModule
  ],
  declarations: [AdminTestsPage]
})
export class AdminTestsPageModule {}
