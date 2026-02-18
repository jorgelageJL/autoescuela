import { Component } from '@angular/core';
import { PreguntaService } from 'src/app/services/pregunta-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.page.html',
  styleUrls: ['./add-pregunta.page.scss'],
  standalone: false /* AÑADIR AL FINAL DE CADA COMPONENTE */
})
export class AddPreguntaPage {
  pregunta: any;
  preguntaForm: FormGroup;

  constructor(
    private preguntaService: PreguntaService,
    private router: Router,
    public formBuilder: FormBuilder,
  ) {
    this.preguntaForm = this.formBuilder.group({
      id_pregunta: null,
      enunciado: ['', Validators.required],
      opcion_a: ['', Validators.required],
      opcion_b: ['', Validators.required],
      opcion_c: ['', Validators.required],
      respuesta: ['', Validators.required],
      tema: ['', Validators.required],
      id_test: ['', Validators.required],
    })
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.updateForm();
  }

  updateForm() {
    // Aquí recibimos los datos si vienes desde update()
    this.pregunta = history.state.pregunta;
    if (this.pregunta) {
      this.preguntaForm.patchValue(this.pregunta);
    }
  }

  async create() {
    console.log(this.preguntaForm.value)
    if (!this.preguntaForm.valid) {
      console.log('Please provide all the required values!')
      return;
    }

    if (this.preguntaForm.value.id_pregunta) {
      await this.preguntaService.updatePregunta(this.preguntaForm.value);
    } else {
      await this.preguntaService.createPregunta(this.preguntaForm.value);
    }

    this.router.navigateByUrl("list-preguntas");
  }

  logout() {
    // this.authService.logout()
  }

  goToHome() {
    this.router.navigateByUrl("home");
  }

  goToPreguntas() {
    this.router.navigateByUrl("list-preguntas");
  }

}
