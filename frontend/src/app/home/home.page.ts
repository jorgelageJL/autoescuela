import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private router: Router) {}

	gotoTests(){
		this.router.navigateByUrl("/tests");
	}

	goToUsersAdmin(){
		this.router.navigateByUrl("/admin-users");
	}

	goToTestsAdmin(){
		this.router.navigateByUrl("/admin-tests");
	}

	logout(){
		this.router.navigateByUrl("/login");
	}
}
