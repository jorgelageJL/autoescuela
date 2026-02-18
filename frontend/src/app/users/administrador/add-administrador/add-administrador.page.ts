import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-administrador',
  templateUrl: './add-administrador.page.html',
  styleUrls: ['./add-administrador.page.scss'],
  standalone: false /* AÑADIR AL FINAL DE CADA COMPONENTE */
})
export class AddAdministradorPage {
  usuario: any;
  usuarioForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    public formBuilder: FormBuilder,
  ) {
    this.usuarioForm = this.formBuilder.group({
      id_admin: null,
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.updateForm();
  }

  updateForm() {
    // Aquí recibimos los datos si vienes desde update()
    this.usuario = history.state.usuario;
    if (this.usuario) {
      this.usuarioForm.patchValue(this.usuario);
    }
  }

  async create() {
    console.log(this.usuarioForm.value)
    if (!this.usuarioForm.valid) {
      console.log('Please provide all the required values!')
      return;
    }

    if (this.usuarioForm.value.id_admin) {
      await this.usuarioService.updateAdministrador(this.usuarioForm.value);
    } else {
      await this.usuarioService.createAdministrador(this.usuarioForm.value);
    }

    this.router.navigateByUrl("list-administradors");
  }

  logout() {
    // this.authService.logout()
  }

  goToHome() {
    this.router.navigateByUrl("home");
  }

  goToAdministradors() {
    this.router.navigateByUrl("list-administradors");
  }

}
