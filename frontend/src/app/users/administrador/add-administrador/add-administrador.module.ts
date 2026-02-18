import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';/* AÑADIR A CADA MODULO */
import { IonicModule } from '@ionic/angular';
import { AddAdministradorPageRoutingModule } from './add-administrador-routing.module';
import { AddAdministradorPage } from './add-administrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,/* AÑADIR A CADA MODULO */
    IonicModule,
    AddAdministradorPageRoutingModule
  ],
  declarations: [AddAdministradorPage]
})
export class AddAdministradorPageModule {}
