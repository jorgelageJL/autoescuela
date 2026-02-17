import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
  standalone: false,
})
export class AdminUsersPage  implements OnInit {

  tipo: string = 'alumno';

  usuario: any = {};
  listado: any[] = [];
  mostrarModal = false;
  usuarioSeleccionado: any = null;

  constructor(
    private usuarioService: UsuarioService,
    private alertCtrl: AlertController,
	private router: Router
  ) {}

  ngOnInit() {
    this.cargarListado();
  }

  cargarListado() {

	this.usuarioSeleccionado = null; // limpia selección

    if (this.tipo === 'alumno') {
      this.usuarioService.getAlumnos().subscribe(data => {
        this.listado = data;
      });
    } else {
      this.usuarioService.getProfesores().subscribe(data => {
        this.listado = data;
      });
    }
    this.limpiarFormulario();
  }

  buscarPorId() {
    if (!this.usuario.id) return;

    if (this.tipo === 'alumno') {
      this.usuarioService.getAlumno(this.usuario.id)
        .subscribe(data => this.usuario = data);
    } else {
      this.usuarioService.getProfesor(this.usuario.id)
        .subscribe(data => this.usuario = data);
    }
  }

  crear() {
    if (this.tipo === 'alumno') {
      this.usuarioService.crearAlumno(this.usuario)
        .subscribe(() => {
          this.mostrarMensaje('Alumno creado');
          this.cargarListado();
        });
    } else {
      this.usuarioService.crearProfesor(this.usuario)
        .subscribe(() => {
          this.mostrarMensaje('Profesor creado');
          this.cargarListado();
        });
    }
  }

  actualizar() {
    const id = this.obtenerId();

    if (!id) return;

    if (this.tipo === 'alumno') {
      this.usuarioService.actualizarAlumno(id, this.usuario)
        .subscribe(() => {
          this.mostrarMensaje('Alumno actualizado');
          this.cargarListado();
        });
    } else {
      this.usuarioService.actualizarProfesor(id, this.usuario)
        .subscribe(() => {
          this.mostrarMensaje('Profesor actualizado');
          this.cargarListado();
        });
    }
  }

  eliminar() {
    const id = this.obtenerId();

    if (!id) return;

    if (this.tipo === 'alumno') {
      this.usuarioService.eliminarAlumno(id)
        .subscribe(() => {
          this.mostrarMensaje('Alumno eliminado');
          this.cargarListado();
        });
    } else {
      this.usuarioService.eliminarProfesor(id)
        .subscribe(() => {
          this.mostrarMensaje('Profesor eliminado');
          this.cargarListado();
        });
    }
  }

  seleccionar(item: any) {
    this.usuario = { ...item };

    if (this.tipo === 'alumno') {
      this.usuario.id = item.id_alumno;
    } else {
      this.usuario.id = item.id_profesor;
    }
  }

  obtenerId(): number {
    if (this.tipo === 'alumno') {
      return this.usuario.id_alumno || this.usuario.id;
    } else {
      return this.usuario.id_profesor || this.usuario.id;
    }
  }

  limpiarFormulario() {
    this.usuario = {};
  }

  async mostrarMensaje(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Información',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
abrirSelector() {
  this.mostrarModal = true;
}

cerrarSelector() {
  this.mostrarModal = false;
}

seleccionarDesdeModal(item: any) {
  this.usuarioSeleccionado = item;
  this.usuario = { ...item };

  if (this.tipo === 'alumno') {
    this.usuario.id = item.id_alumno;
  } else {
    this.usuario.id = item.id_profesor;
  }

  this.cerrarSelector();
}

limpiarTodo() {
  this.usuario = {};
  this.usuarioSeleccionado = null;
}

  volverHome() {
  this.router.navigate(['/home']);
}
}
