import { Component } from '@angular/core';
import { PreguntaService } from 'src/app/services/pregunta-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
  standalone: false /* AÑADIR AL FINAL DE CADA COMPONENTE */
})
export class TestPage {
  id_test: any;
  preguntas: any[] = [];
  respuestas: any[] = [];
  testForm!: FormGroup;

  constructor(
    private preguntaService: PreguntaService,
    private router: Router,
    public formBuilder: FormBuilder,
  ) { }

  crearFormulario() {
    const group: any = {};
    this.preguntas.forEach(pregunta => {
      group[pregunta.id_pregunta] = ['', Validators.required];
    });
    this.testForm = this.formBuilder.group(group);
  }

  async getAllPreguntasDelTest(id_test: string): Promise<any[]> {
    return await this.preguntaService.getAllPreguntasDelTest(id_test);
  }

  mezclarOpciones() {
    this.preguntas = this.preguntas.map(pregunta => {
      const opciones = [pregunta.opcion_a, pregunta.opcion_b, pregunta.opcion_c, pregunta.respuesta];
      return {
        ...pregunta,
        opciones: opciones.sort(() => Math.random() - 0.5)
      };
    });
  }

  async ionViewWillEnter() {
    // Mover foco a body, evitando elementos de la página anterior
    (document.activeElement as HTMLElement)?.blur();
    this.id_test = history.state.id_test;
    if (this.id_test) {
      this.preguntas = await this.getAllPreguntasDelTest(this.id_test);
      this.mezclarOpciones();
      this.crearFormulario();
    }
  }

  async create() {
    this.testForm.markAllAsTouched();

    if (this.testForm.invalid) {
      console.log("Responde todas las preguntas");
      return;
    }

    let correctas = 0;
    this.preguntas.forEach(pregunta => {
      if (this.testForm.value[pregunta.id_pregunta] === pregunta.respuesta) {
        correctas++;
      }
    });

    console.log("Resultado:", correctas, "de", this.preguntas.length);
    // this.router.navigateByUrl("list-tests");
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
