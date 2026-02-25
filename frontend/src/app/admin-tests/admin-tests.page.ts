import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario-service';
import { TestService } from 'src/app/services/test-service';

@Component({
  selector: 'app-admin-tests',
  templateUrl: './admin-tests.page.html',
  styleUrls: ['./admin-tests.page.scss'],
  standalone: false,
})
export class AdminTestsPage {

  pregunta: any = {};
  preguntas: any[] = [];
  tests: any = [];
  nuevoTest: any = {};
  testSeleccionado: any = null;
  preguntaSeleccionada: any = null;

  constructor(
    private usuarioService: UsuarioService,
    private testService: TestService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

//   async ionViewWillEnter() {
//     this.cargarTests();
//   }

//   async crearTest() {
//     const data = {
//       nombre: this.nuevoTest.nombre,
//       id_admin: 1
//     };

//     await this.testService.createTest(data);
//     this.mostrarMensaje('Test creado correctamente');
//     this.nuevoTest = {};
//     this.cargarTests();
//   }

//   async cargarTests() {
//     this.tests = await this.testService.getAllTests();
//   }

//   cargarPreguntas() {
//     this.usuarioService.getPreguntas().subscribe(data => {
//       this.preguntas = data;
//     });
//     this.preguntaSeleccionada = null;
//   }

//   seleccionar(item: any) {
//     this.preguntaSeleccionada = item;
//     this.pregunta = { ...item };
//   }

//   crear() {
//     this.usuarioService.crearPregunta(this.pregunta)
//       .subscribe(() => {
//         this.mostrarMensaje('Pregunta creada');
//         this.cargarPreguntas();
//         this.limpiar();
//       });
//   }

//   actualizar() {
//     if (!this.pregunta.id_pregunta) return;

//     this.usuarioService.actualizarPregunta(this.pregunta.id_pregunta, this.pregunta)
//       .subscribe(() => {
//         this.mostrarMensaje('Pregunta actualizada');
//         this.cargarPreguntas();
//       });
//   }

//   eliminar() {
//     if (!this.pregunta.id_pregunta) return;

//     this.usuarioService.eliminarPregunta(this.pregunta.id_pregunta)
//       .subscribe(() => {
//         this.mostrarMensaje('Pregunta eliminada');
//         this.cargarPreguntas();
//         this.limpiar();
//       });
//   }

//   limpiar() {
//     this.pregunta = {};
//     this.preguntaSeleccionada = null;
//   }

//   volver() {
//     this.router.navigateByUrl('/home');
//   }

//   async mostrarMensaje(mensaje: string) {
//     const alert = await this.alertCtrl.create({
//       header: 'Información',
//       message: mensaje,
//       buttons: ['OK']
//     });
//     await alert.present();
//   }

//   onTestChange(event: any) {
//     const idTest = event.detail.value;

//     this.testSeleccionado = this.tests.find(t => t.id_test === idTest);

//     if (!idTest) {
//       this.preguntas = [];
//       return;
//     }

//     this.usuarioService.getPreguntasPorTest(idTest)
//       .subscribe(data => {
//         this.preguntas = data;
//         this.preguntaSeleccionada = null;
//         this.pregunta = { id_test: idTest };
//       });
//   }

}
