import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';/* AÑADIR A CADA MODULO */
import { IonicModule } from '@ionic/angular';
import { ListAlumnosPageRoutingModule } from './list-alumnos-routing.module';
import { ListAlumnosPage } from './list-alumnos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,/* AÑADIR A CADA MODULO */
    IonicModule,
    ListAlumnosPageRoutingModule
  ],
  declarations: [ListAlumnosPage]
})
export class ListAlumnosPageModule { }
