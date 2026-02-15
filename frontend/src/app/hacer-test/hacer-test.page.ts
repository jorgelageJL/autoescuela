import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from '../services/pregunta';
import { Router } from '@angular/router';

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

  // Verificar que todas estén respondidas
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
}


  constructor(
    private preguntaService: PreguntaService,
    private route: ActivatedRoute,
	private router: Router
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
