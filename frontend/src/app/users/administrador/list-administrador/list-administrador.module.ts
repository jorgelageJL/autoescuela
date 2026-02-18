import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';/* AÑADIR A CADA MODULO */
import { IonicModule } from '@ionic/angular';
import { ListAdministradorPageRoutingModule } from './list-administrador-routing.module';
import { ListAdministradorPage } from './list-administrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,/* AÑADIR A CADA MODULO */
    IonicModule,
    ListAdministradorPageRoutingModule
  ],
  declarations: [ListAdministradorPage]
})
export class ListAdministradorPageModule {}
