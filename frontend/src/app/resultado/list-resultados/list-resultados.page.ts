import { Component } from '@angular/core';
import { ResultadoService } from 'src/app/services/resultado-service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-resultado',
  templateUrl: './list-resultados.page.html',
  styleUrls: ['./list-resultados.page.scss'],
  standalone: false /* AÑADIR AL FINAL DE CADA COMPONENTE */
})
export class ListResultadosPage {
  resultados: any = [];

  constructor(
    private resultadoService: ResultadoService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.ionViewWillEnter();
  }

  async getAll() {
    const user = await this.authService.getUserLogued();
    console.log("id a enviar: " + user.id)
    this.resultados = await this.resultadoService.getAllResultadosByAlumno(user.id);
  }

  ionViewWillEnter() {
    // Mover foco a body, evitando elementos de la página anterior
    (document.activeElement as HTMLElement)?.blur();
    this.getAll();
  }

  update(test: any) {
    // this.router.navigate(['add-test'], {
    //   state: { test }
    // });
  }

  async delete(id_test: string, id_alumno: string) {
    // await this.resultadoService.deleteResultado(id_test, id_alumno);
    // this.getAll();
  }

  logout() {
    // this.authService.logout()
  }

  goToHome() {
    this.router.navigateByUrl("home");
  }

  goToAlumnos() {
    this.router.navigateByUrl("list-alumnos");
  }

  goToProfesors() {
    this.router.navigateByUrl("list-profesors");
  }

}
