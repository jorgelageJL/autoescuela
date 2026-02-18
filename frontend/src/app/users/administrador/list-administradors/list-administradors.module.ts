import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';/* AÑADIR A CADA MODULO */
import { IonicModule } from '@ionic/angular';
import { ListAdministradorsPageRoutingModule } from './list-administradors-routing.module';
import { ListAdministradorsPage } from './list-administradors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,/* AÑADIR A CADA MODULO */
    IonicModule,
    ListAdministradorsPageRoutingModule
  ],
  declarations: [ListAdministradorsPage]
})
export class ListAdministradorPageModule {}
