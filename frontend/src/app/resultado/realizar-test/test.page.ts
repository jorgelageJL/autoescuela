import { Component } from '@angular/core';
import { ResultadoService } from 'src/app/services/resultado-service';
import { AuthService } from '../../services/auth.service';
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
  resultado = {};
  testForm!: FormGroup;

  constructor(
    private resultadoService: ResultadoService,
    private authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder,
  ) { }

  mezclarOpciones() {
    this.preguntas = this.preguntas.map(pregunta => {
      const opciones = [pregunta.opcion_a, pregunta.opcion_b, pregunta.opcion_c, pregunta.respuesta];
      return {
        ...pregunta,
        opciones: opciones.sort(() => Math.random() - 0.5)
      };
    });
  }

  crearFormulario() {
    const group: any = {};
    this.preguntas.forEach(pregunta => {
      group[pregunta.id_pregunta] = ['', Validators.required];
    });
    this.testForm = this.formBuilder.group(group);
  }

  async ionViewWillEnter() {
    // Mover foco a body, evitando elementos de la página anterior
    (document.activeElement as HTMLElement)?.blur();
    this.preguntas = history.state.preguntas;
    this.id_test = history.state.id_test;
    if (this.preguntas) {
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

    // console.log("Resultado:", correctas, "de", this.preguntas.length);
    alert(`Resultado: ${correctas} de ${this.preguntas.length}`)

    const user = await this.authService.getUserLogued();
    console.log("logueado: " + user.id, user.nombre, user.email);

    this.resultado = {
      id_test: this.id_test,
      id_alumno: user.id,
      fecha: Date.now(),
      nota: correctas
    };

    console.log(this.resultado)

    await this.resultadoService.createResultado(this.resultado);
    this.router.navigateByUrl("list-resultados");
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
