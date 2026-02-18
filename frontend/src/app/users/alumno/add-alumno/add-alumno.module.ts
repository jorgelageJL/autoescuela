import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';/* AÑADIR A CADA MODULO */
import { IonicModule } from '@ionic/angular';
import { AddAlumnoPageRoutingModule } from './add-alumno-routing.module';
import { AddAlumnoPage } from './add-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,/* AÑADIR A CADA MODULO */
    IonicModule,
    AddAlumnoPageRoutingModule
  ],
  declarations: [AddAlumnoPage]
})
export class AddAlumnoPageModule {}
