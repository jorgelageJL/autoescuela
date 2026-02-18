import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';/* AÑADIR A CADA MODULO */
import { IonicModule } from '@ionic/angular';
import { ListResultadosPageRoutingModule } from './list-resultados-routing.module';
import { ListResultadosPage } from './list-resultados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,/* AÑADIR A CADA MODULO */
    IonicModule,
    ListResultadosPageRoutingModule
  ],
  declarations: [ListResultadosPage]
})
export class ListResultadosPageModule {}
