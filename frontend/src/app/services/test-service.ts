import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  endPoint: string = 'http://localhost:8080/api/tests';
  
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  async getAllTests() {
    return firstValueFrom(
      this.httpClient.get(this.endPoint, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }

  async deleteTest(id: string) {
    return firstValueFrom(
      this.httpClient.delete(`${this.endPoint}/${id}`, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }

  async createTest(test: any) {
    return firstValueFrom(
      this.httpClient.post(this.endPoint, test, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }

  async updateTest(test: any) {
    return firstValueFrom(
      this.httpClient.put(`${this.endPoint}/${test.id_test}`, test, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }
}
