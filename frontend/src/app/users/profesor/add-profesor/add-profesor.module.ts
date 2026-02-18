import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';/* AÑADIR A CADA MODULO */
import { IonicModule } from '@ionic/angular';
import { AddProfesorPageRoutingModule } from './add-profesor-routing.module';
import { AddProfesorPage } from './add-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,/* AÑADIR A CADA MODULO */
    IonicModule,
    AddProfesorPageRoutingModule
  ],
  declarations: [AddProfesorPage]
})
export class AddProfesorPageModule {}
