import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-alumnos',
  templateUrl: './list-alumnos.page.html',
  styleUrls: ['./list-alumnos.page.scss'],
  standalone: false /* AÑADIR AL FINAL DE CADA COMPONENTE */
})
export class ListAlumnosPage {
  usuarios: any = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {
    this.ionViewWillEnter();
  }

  async getAll() {
    this.usuarios = await this.usuarioService.getAllAlumnos();
  }

  ionViewWillEnter() {
    // Mover foco a body, evitando elementos de la página anterior
    (document.activeElement as HTMLElement)?.blur();
    this.getAll();
  }

  update(usuario: any) {
    this.router.navigate(['add-alumno'], {
      state: { usuario }
    });
  }

  async delete(usuario: any) {
    const del = confirm(`¿Desea eliminar el Alumno: '${usuario.nombre} ${usuario.apellidos}' con id: ${usuario.id_alumno}?`)
    if (del) {
      await this.usuarioService.deleteAlumno(usuario.id_alumno);
      this.getAll();
    }
  }

  logout() {
    // this.authService.logout()
  }

  goToHome() {
    this.router.navigateByUrl("home");
  }

  goToAddAlumno() {
    this.router.navigateByUrl("add-alumno");
  }

  goToProfesors() {
    this.router.navigateByUrl("list-profesors");
  }

  goToAdministradors() {
    this.router.navigateByUrl("list-administradors");
  }

}
