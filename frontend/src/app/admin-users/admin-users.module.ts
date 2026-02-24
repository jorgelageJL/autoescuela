import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';/* AÑADIR A CADA MODULO */
import { IonicModule } from '@ionic/angular';
import { AdminUsersPageRoutingModule } from './admin-users-routing.module';
import { AdminUsersPage } from './admin-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,/* AÑADIR A CADA MODULO */
    IonicModule,
    AdminUsersPageRoutingModule
  ],
  declarations: [AdminUsersPage]
})
export class AdminUsersPageModule {}
