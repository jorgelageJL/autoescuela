import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../services/test';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.page.html',
  styleUrls: ['./tests.page.scss'],
  standalone: false,
})
export class TestsPage implements OnInit {

	tests: any = [];

  constructor(
	private testService: TestService, 
	private router: Router
	) { }

irHome() {
  this.router.navigate(['/home']);
}


  ngOnInit() {
	this.getAllTests();
  }

  getAllTests(){
	this.testService.getTests().subscribe(response => {
		console.log(response);
		this.tests = response;
	})
  }
  hacerTest(id: number){
	this.router.navigate(['/hacer-test',id]);
  }

}
