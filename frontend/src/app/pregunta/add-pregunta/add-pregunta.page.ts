import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreguntaService } from 'src/app/services/pregunta-service';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.page.html',
  styleUrls: ['./add-pregunta.page.scss'],
  standalone: false /* AÑADIR AL FINAL DE CADA COMPONENTE */
})
export class AddPreguntaPage {
  pregunta: any;
  preguntaForm: FormGroup;
  capturedPhoto: string = "";
  originalImage: string = "";

  constructor(
    private preguntaService: PreguntaService,
    private router: Router,
    public formBuilder: FormBuilder,
    private photoService: PhotoService,
  ) {
    this.preguntaForm = this.formBuilder.group({
      id_pregunta: null,
      enunciado: ['', Validators.required],
      opcion_a: ['', Validators.required],
      opcion_b: ['', Validators.required],
      opcion_c: ['', Validators.required],
      respuesta: ['', Validators.required],
      tema: ['', Validators.required],
      filename: '',
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
      this.capturedPhoto = `http://localhost:8080/images/${this.pregunta.filename}`
      this.originalImage = `http://localhost:8080/images/${this.pregunta.filename}`
    }
  }

  takePhoto() {
    // DECOMMENT:
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath ? data.webPath : "";
    });
  }

  pickImage() {
    // DECOMMENT:
    this.photoService.pickImage().then(data => {
      console.log(`rutaaa: ${data.webPath}`)
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    // DECOMMENT:
    this.capturedPhoto = "";
  }

  imageChanged() {
    return this.capturedPhoto && this.capturedPhoto != this.originalImage;
  }

  async create() {
    console.log(this.preguntaForm.value)
    if (!this.preguntaForm.valid || this.capturedPhoto === "") {
      console.log('Please provide all the required values!')
      return;
    }

    let blob: any = null;
    if (this.imageChanged()) {
      const response = await fetch(this.capturedPhoto);
      blob = await response.blob();
    }

    if (this.preguntaForm.value.id_pregunta/* filename */) {
      await this.preguntaService.updatePregunta(this.preguntaForm.value, blob);
    } else {
      await this.preguntaService.createPregunta(this.preguntaForm.value, blob);
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
