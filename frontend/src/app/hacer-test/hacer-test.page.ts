import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from '../services/pregunta';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario';

@Component({
  selector: 'app-hacer-test',
  templateUrl: './hacer-test.page.html',
  styleUrls: ['./hacer-test.page.scss'],
  standalone: false,
})
export class HacerTestPage implements OnInit {

  preguntas: any = [];
  id: number = 0;
  mostrarResultado: boolean = false;
  nota: number = 0;

	responder(pregunta: any, opcion: string) {
  if (!pregunta.respondida) {
    pregunta.respondida = true;
    pregunta.seleccionada = opcion;
  }
}

getClase(pregunta: any, opcion: string): string {
  if (!pregunta.respondida) return '';
  let textoOpcion = '';
  if (opcion === 'A') textoOpcion = pregunta.opcion_a;
  if (opcion === 'B') textoOpcion = pregunta.opcion_b;
  if (opcion === 'C') textoOpcion = pregunta.opcion_c;
  if (textoOpcion === pregunta.respuesta) {
    return 'correcta';
  }
  if (opcion === pregunta.seleccionada && textoOpcion !== pregunta.respuesta) {
    return 'incorrecta';
  }
  return '';
}
finalizarTest() {

  const sinResponder = this.preguntas.some((p: any) => !p.respondida);
  if (sinResponder) {
    alert('Debes responder todas las preguntas');
    return;
  }

  let correctas = 0;

  this.preguntas.forEach((pregunta: any) => {
    let textoSeleccionado = '';
    if (pregunta.seleccionada === 'A') textoSeleccionado = pregunta.opcion_a;
    if (pregunta.seleccionada === 'B') textoSeleccionado = pregunta.opcion_b;
    if (pregunta.seleccionada === 'C') textoSeleccionado = pregunta.opcion_c;

    if (textoSeleccionado === pregunta.respuesta) {
      correctas++;
    }
  });

  this.nota = correctas;
  this.mostrarResultado = true;
  this.guardarResultado();
}
guardarResultado() {

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  console.log("USER:", user);

  if (!user || !user.id) {
    console.error("No hay alumno logueado");
    return;
  }

  const resultado = {
    id_test: this.id,
    id_alumno: user.id,
    nota: this.nota
  };

  this.usuarioService.crearResultado(resultado)
    .subscribe({
      next: () => console.log("Resultado guardado"),
      error: (err) => console.error(err)
    });
}

  constructor(
    private preguntaService: PreguntaService,
    private route: ActivatedRoute,
	private router: Router,
	private usuarioService: UsuarioService
  ) { }


  volver() {
  this.router.navigate(['/tests']);
  }

  
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getPreguntas();
  }

  getPreguntas(){
    this.preguntaService.getPreguntasByTest(this.id)
      .subscribe(response => {
        console.log(response);
        this.preguntas = response;
      });
  }

}
