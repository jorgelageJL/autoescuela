import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';/* AÑADIR A CADA MODULO */
import { IonicModule } from '@ionic/angular';
import { AddTestPageRoutingModule } from './add-test-routing.module';
import { AddTestPage } from './add-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,/* AÑADIR A CADA MODULO */
    IonicModule,
    AddTestPageRoutingModule
  ],
  declarations: [AddTestPage]
})
export class AddTestPageModule {}
