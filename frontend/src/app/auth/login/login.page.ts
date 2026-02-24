import { Component, OnInit } from '@angular/core';
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
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  async login(form: NgForm) {
    form.control.updateValueAndValidity();

    try {
      let user: User = {
        // id: null,
        email: form.value.email,
        password: form.value.password,
        // name: null,
        // isAdmin: null
      };
      const res = await this.authService.login(user);
      if (res.user/* || res.access_token*/) {
        form.reset();
        this.router.navigateByUrl('home');
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
