import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-profesor',
  templateUrl: './list-profesor.page.html',
  styleUrls: ['./list-profesor.page.scss'],
  standalone: false /* AÑADIR AL FINAL DE CADA COMPONENTE */
})
export class ListProfesorPage {
  usuarios: any = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {
    this.ionViewWillEnter();
  }

  async getAll() {
    this.usuarios = await this.usuarioService.getAllProfesors();
  }

  ionViewWillEnter() {
    // Mover foco a body, evitando elementos de la página anterior
    (document.activeElement as HTMLElement)?.blur();
    this.getAll();
  }

  update(usuario: any) {
    this.router.navigate(['add-profesor'], {
      state: { usuario }
    });
  }

  async delete(id: string) {
    // await this.usuarioService.deleteProfesor(id);
    // this.getAll();
  }

  logout() {
    // this.authService.logout()
  }

  goToHome() {
    this.router.navigateByUrl("home");
  }

  goToAddProfesor() {
    this.router.navigateByUrl("add-profesor");
  }

  goToAlumnos() {
    this.router.navigateByUrl("list-alumnos");
  }

  goToAdministradors() {
    this.router.navigateByUrl("list-administradors");
  }

}
