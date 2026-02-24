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

	constructor(
		private router: Router,
		private authService: AuthService,
	) { }

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
		this.router.navigateByUrl("admin-tests");
	}

	logout() {
		this.authService.logout()
	}
}
