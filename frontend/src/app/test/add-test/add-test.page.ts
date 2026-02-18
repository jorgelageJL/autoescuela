import { Component } from '@angular/core';
import { TestService } from 'src/app/services/test-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.page.html',
  styleUrls: ['./add-test.page.scss'],
  standalone: false /* AÑADIR AL FINAL DE CADA COMPONENTE */
})
export class AddTestPage {
  test: any;
  testForm: FormGroup;

  constructor(
    private testService: TestService,
    private router: Router,
    public formBuilder: FormBuilder,
  ) {
    this.testForm = this.formBuilder.group({
      id_test: null,
      nombre: ['', Validators.required],
      id_admin: ['', Validators.required],
    })
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.updateForm();
  }

  updateForm() {
    // Aquí recibimos los datos si vienes desde update()
    this.test = history.state.test;
    if (this.test) {
      this.testForm.patchValue(this.test);
    }
  }

  async create() {
    console.log(this.testForm.value)
    if (!this.testForm.valid) {
      console.log('Please provide all the required values!')
      return;
    }

    if (this.testForm.value.id_test) {
      await this.testService.updateTest(this.testForm.value);
    } else {
      await this.testService.createTest(this.testForm.value);
    }

    this.router.navigateByUrl("list-tests");
  }

  logout() {
    // this.authService.logout()
  }

  goToHome() {
    this.router.navigateByUrl("home");
  }

  goToTests() {
    this.router.navigateByUrl("list-tests");
  }

}
