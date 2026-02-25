import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  rol: string = 'alumnos';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
  ) { }

  async login(form: NgForm) {
    form.control.updateValueAndValidity();

    // this.rol = form.value.rol;
    // console.log("rol: " + this.rol)

    try {
      let user: User = {
        // id: null,
        email: form.value.email,
        password: form.value.password,
        rol: form.value.rol,
        // name: null,
        // isAdmin: null
      };
      const res = await this.authService.login(user, this.rol);
      if (res.user/* || res.access_token*/) {
        let user = await this.authService.getUserLogued();
        console.log(user.rol)
        form.reset();
        this.router.navigateByUrl('home');
      } else {
        this.presentAlert("invalid credentials");
      }
    } catch (err) {
      console.error(err);
    }
    // this.authService.login(user).subscribe({
    //   next: (res) => {
    //     if (!res.access_token) {
    //       this.presentAlert("invalid credentials");
    //       return;
    //     }
    //     // console.log('id usuario: ' + res.user.id)
    //     // console.log('username usuario: ' + res.user.username)
    //     form.reset();
    //     this.router.navigateByUrl('list-bicycles');
    //   },
    //   error: err => {
    //     this.presentAlert("Error");
    //   }
    // });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: message,
      message: 'Could not login. Try again.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
