import { Component } from '@angular/core';
import { TestService } from 'src/app/services/test-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-tests',
  templateUrl: './list-tests.page.html',
  styleUrls: ['./list-tests.page.scss'],
  standalone: false /* AÑADIR AL FINAL DE CADA COMPONENTE */
})
export class ListTestsPage {
  tests: any = [];

  constructor(
    private testService: TestService,
    private router: Router,
  ) {
    this.ionViewWillEnter();
  }

  async getAll() {
    this.tests = await this.testService.getAllTests();
  }

  ionViewWillEnter() {
    // Mover foco a body, evitando elementos de la página anterior
    (document.activeElement as HTMLElement)?.blur();
    this.getAll();
  }

  update(test: any) {
    this.router.navigate(['add-test'], {
      state: { test }
    });
  }

  async delete(id: string) {
    // await this.testService.deleteTest(id);
    // this.getAll();
  }

  async test(id_test: string) {
    this.router.navigate(['realizar-test'], {
      state: { id_test }
    });
  }

  logout() {
    // this.authService.logout()
  }

  goToHome() {
    this.router.navigateByUrl("home");
  }

  goToAddTest() {
    this.router.navigateByUrl("add-test");
  }

  goToAlumnos() {
    this.router.navigateByUrl("list-alumnos");
  }

  goToProfesors() {
    this.router.navigateByUrl("list-profesors");
  }

}
