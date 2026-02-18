import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';/* AÑADIR A CADA MODULO */
import { IonicModule } from '@ionic/angular';
import { ListTestsPageRoutingModule } from './list-tests-routing.module';
import { ListTestsPage } from './list-tests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,/* AÑADIR A CADA MODULO */
    IonicModule,
    ListTestsPageRoutingModule
  ],
  declarations: [ListTestsPage]
})
export class ListTestsPageModule {}
