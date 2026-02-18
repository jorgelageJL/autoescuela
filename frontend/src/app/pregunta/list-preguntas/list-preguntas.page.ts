import { Component } from '@angular/core';
import { PreguntaService } from 'src/app/services/pregunta-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-preguntas',
  templateUrl: './list-preguntas.page.html',
  styleUrls: ['./list-preguntas.page.scss'],
  standalone: false /* AÑADIR AL FINAL DE CADA COMPONENTE */
})
export class ListPreguntasPage {
preguntas: any = [];

  constructor(
    private preguntaService: PreguntaService,
    private router: Router,
  ) {
    this.ionViewWillEnter();
  }

  async getAll() {
    this.preguntas = await this.preguntaService.getAllPreguntas();
  }

  ionViewWillEnter() {
    // Mover foco a body, evitando elementos de la página anterior
    (document.activeElement as HTMLElement)?.blur();
    this.getAll();
  }

  update(pregunta: any) {
    this.router.navigate(['add-pregunta'], {
      state: { pregunta }
    });
  }

  async delete(id: string) {
    // await this.preguntaService.deletePregunta(id);
    // this.getAll();
  }

  logout() {
    // this.authService.logout()
  }

  goToHome() {
    this.router.navigateByUrl("home");
  }

  goToAddPregunta() {
    this.router.navigateByUrl("add-pregunta");
  }

  goToAlumnos() {
    this.router.navigateByUrl("list-alumnos");
  }

  goToProfesors() {
    this.router.navigateByUrl("list-profesors");
  }

}
