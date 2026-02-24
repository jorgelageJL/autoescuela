import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TestsPageRoutingModule } from './tests-routing.module';
import { TestsPage } from './tests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestsPageRoutingModule
  ],
  declarations: [TestsPage]
})
export class TestsPageModule {}
