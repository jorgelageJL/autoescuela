import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-administradors',
  templateUrl: './list-administradors.page.html',
  styleUrls: ['./list-administradors.page.scss'],
  standalone: false /* AÑADIR AL FINAL DE CADA COMPONENTE */
})
export class ListAdministradorsPage {
  usuarios: any = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {
    this.ionViewWillEnter();
  }

  async getAll() {
    this.usuarios = await this.usuarioService.getAllAdministradors();
  }

  ionViewWillEnter() {
    // Mover foco a body, evitando elementos de la página anterior
    (document.activeElement as HTMLElement)?.blur();
    this.getAll();
  }

  update(usuario: any) {
    this.router.navigate(['add-administrador'], {
      state: { usuario }
    });
  }

  async delete(usuario: any) {
    const del = confirm(`¿Desea eliminar el Administrador: '${usuario.nombre} ${usuario.apellidos}' con id: ${usuario.id_admin}?`)
    if (del) {
      await this.usuarioService.deleteAdministrador(usuario.id_admin);
      this.getAll();
    }
  }

  logout() {
    // this.authService.logout()
  }

  goToHome() {
    this.router.navigateByUrl("home");
  }

  goToAddAdministrador() {
    this.router.navigateByUrl("add-administrador");
  }

  goToAlumnos() {
    this.router.navigateByUrl("list-alumnos");
  }

  goToProfesors() {
    this.router.navigateByUrl("list-profesors");
  }

}
