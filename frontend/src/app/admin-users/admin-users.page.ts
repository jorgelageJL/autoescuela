import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario-service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
  standalone: false,
})
export class AdminUsersPage {

  tipo: string = 'alumno';
  usuario: any = {};
  listado: any = [];
  mostrarModal = false;
  usuarioSeleccionado: any = null;

  constructor(
    private usuarioService: UsuarioService,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    // Mover foco a body, evitando elementos de la página anterior
    (document.activeElement as HTMLElement)?.blur();
    this.cargarListado();
  }

  async cargarListado() {
    if (this.tipo === 'alumno') {
      this.listado = await this.usuarioService.getAllAlumnos();
    } else {
      this.listado = await this.usuarioService.getAllProfesors();
    }
  }

  // buscarPorId() {
  //   if (!this.usuario.id) return;

  //   if (this.tipo === 'alumno') {
  //     this.usuarioService.getAlumno(this.usuario.id)
  //       .subscribe(data => this.usuario = data);
  //   } else {
  //     this.usuarioService.getProfesor(this.usuario.id)
  //       .subscribe(data => this.usuario = data);
  //   }
  // }

  async crear(form: any) {
    if (this.tipo === 'alumno') {
      await this.usuarioService.createAlumno(this.usuario);
      this.mostrarMensaje('Alumno creado');
      this.limpiarTodo(form);
      this.cargarListado();
    } else {
      await this.usuarioService.createProfesor(this.usuario);
      this.mostrarMensaje('Profesor creado');
      this.limpiarTodo(form);
      this.cargarListado();
    }
  }

  async actualizar(form: any) {
    // console.log(this.usuario)
    // const id = this.obtenerId();
    // if (!id) return;

    if (this.tipo === 'alumno') {
      console.log(this.usuario)
      await this.usuarioService.updateAlumno(this.usuario);
      this.mostrarMensaje('Alumno actualizado');
      this.limpiarTodo(form);
      this.cargarListado();
    } else {
      await this.usuarioService.updateProfesor(this.usuario);
      this.mostrarMensaje('Profesor actualizado');
      this.limpiarTodo(form);
      this.cargarListado();
    }
  }

  async eliminar(form: any) {
    // const id = this.obtenerId();
    // if (!id) return;

    if (this.tipo === 'alumno') {
      const id = this.usuario.id_alumno;
      const del = confirm(`¿Desea eliminar el Alumno: '${this.usuario.nombre} ${this.usuario.apellidos}' con id: ${id}?`)
      if (del) {
        await this.usuarioService.deleteAlumno(id);
        this.cargarListado();
        this.mostrarMensaje('Alumno eliminado');
        this.limpiarTodo(form);
        this.cargarListado();
      }
    } else {
      const id = this.usuario.id_profesor;
      const del = confirm(`¿Desea eliminar el Profesor: '${this.usuario.nombre} ${this.usuario.apellidos}' con id: ${id}?`)
      if (del) {
        await this.usuarioService.deleteProfesor(id);
        this.cargarListado();
        this.mostrarMensaje('Profesor eliminado');
        this.limpiarTodo(form);
        this.cargarListado();
      }
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

  // obtenerId(): number {
  //   if (this.tipo === 'alumno') {
  //     return this.usuario.id_alumno || this.usuario.id;
  //   } else {
  //     return this.usuario.id_profesor || this.usuario.id;
  //   }
  // }

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

  limpiarTodo(form: any) {
    this.usuario = {};
    this.usuarioSeleccionado = null;
    form.resetForm();
  }

  volverHome() {
    this.router.navigate(['/home']);
  }
}
