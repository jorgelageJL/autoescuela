import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {

  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
  if (!this.email || !this.password || !this.role) {
    alert('Completa todos los campos');
    return;
  }

  this.auth.login(this.email, this.password, this.role).subscribe({
  next: (res: any) => {
  console.log("LOGIN RESPONSE:", res);

  localStorage.setItem('user', JSON.stringify(res));

  if (this.role === 'alumno') {
  console.log("ID alumno:", res.id);
  localStorage.setItem('id_alumno', res.id.toString());
}
  this.router.navigateByUrl('/home');
},
  error: (err) => {
    console.error(err);
    alert('Credenciales incorrectas');
  }
});
}
}