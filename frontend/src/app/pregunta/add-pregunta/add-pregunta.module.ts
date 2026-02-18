import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';/* AÑADIR A CADA MODULO */
import { IonicModule } from '@ionic/angular';
import { AddPreguntaPageRoutingModule } from './add-pregunta-routing.module';
import { AddPreguntaPage } from './add-pregunta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,/* AÑADIR A CADA MODULO */
    IonicModule,
    AddPreguntaPageRoutingModule
  ],
  declarations: [AddPreguntaPage]
})
export class AddPreguntaPageModule {}
