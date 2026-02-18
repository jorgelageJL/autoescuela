import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';/* AÑADIR A CADA MODULO */
import { IonicModule } from '@ionic/angular';
import { ListPreguntasPageRoutingModule } from './list-preguntas-routing.module';
import { ListPreguntasPage } from './list-preguntas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,/* AÑADIR A CADA MODULO */
    IonicModule,
    ListPreguntasPageRoutingModule
  ],
  declarations: [ListPreguntasPage]
})
export class ListPreguntasPageModule {}
