import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
  standalone: false,
})
export class ResultsPage implements OnInit {

  resultados: any[] = [];
  idAlumno!: number;

  constructor(
    private usuarioService: UsuarioService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.idAlumno = Number(localStorage.getItem('id_alumno'));

    if (this.idAlumno) {
      this.cargarResultados();
    }
  }

  async cargarResultados() {

    const loading = await this.loadingCtrl.create({
      message: 'Cargando resultados...'
    });

    await loading.present();

    this.usuarioService
      .getResultadosPorAlumno(this.idAlumno)
      .subscribe({
        next: (data) => {
  			console.log("RESULTADOS:", data);
  			this.resultados = data;
  			loading.dismiss();
		},
        error: (err) => {
          console.error(err);
          loading.dismiss();
        }
      });
  }

  borrarResultado(r: any) {
    this.usuarioService
      .eliminarResultado(r.id_test, r.id_alumno)
      .subscribe(() => {
        this.cargarResultados();
      });
  }
}