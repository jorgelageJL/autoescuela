import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	standalone: false,
})
export class HomePage {
	rol: string = '';

	constructor(
		private router: Router,
		private authService: AuthService,
	) { }

	async ionViewWillEnter() {
		let user = await this.authService.getUserLogued();
		this.rol = user.rol;
		console.log("mi rol: " + this.rol);
	}

	goToTests() {
		this.router.navigateByUrl("list-tests");
	}

	goToResultados() {
		this.router.navigateByUrl("list-resultados");
	}

	goToUsersAdmin() {
		this.router.navigateByUrl("admin-users");
	}

	goToTestsAdmin() {
		this.router.navigateByUrl("list-tests");
	}

	goToPreguntas() {
		this.router.navigateByUrl("list-preguntas");
	}

	logout() {
		this.authService.logout()
	}
}
