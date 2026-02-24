import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HacerTestPageRoutingModule } from './hacer-test-routing.module';

import { HacerTestPage } from './hacer-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HacerTestPageRoutingModule
  ],
  declarations: [HacerTestPage]
})
export class HacerTestPageModule {}
