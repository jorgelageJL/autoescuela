import { Component } from '@angular/core';
import { PreguntaService } from 'src/app/services/pregunta-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
  standalone: false /* AÑADIR AL FINAL DE CADA COMPONENTE */
})
export class TestPage {
  id_test: any;
  preguntas: any = [];

  constructor(
    private preguntaService: PreguntaService,
    private router: Router,
  ) {
    this.ionViewWillEnter();
  }

  async getAllPreguntasDelTest(id_test: string) {
    this.preguntas = await this.preguntaService.getAllPreguntasDelTest(id_test);
  }

  ionViewWillEnter() {
    // Mover foco a body, evitando elementos de la página anterior
    (document.activeElement as HTMLElement)?.blur();
    this.id_test = history.state.id_test;
    this.getAllPreguntasDelTest(this.id_test);
    // if (this.id_test) {
    //   this.preguntaForm.patchValue(this.pregunta);
    // }
  }

  logout() {
    // this.authService.logout()
  }

  goToHome() {
    this.router.navigateByUrl("home");
  }

  goToTests() {
    this.router.navigateByUrl("list-tests");
  }

  goToAlumnos() {
    this.router.navigateByUrl("list-alumnos");
  }

  goToProfesors() {
    this.router.navigateByUrl("list-profesors");
  }

}
