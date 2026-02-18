import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  endPoint: string = 'http://localhost:8080/api/tests';
  
  constructor(
    private httpClient: HttpClient,
  ) { }

  async getAllTests() {
    return firstValueFrom(
      this.httpClient.get(this.endPoint)
    );
  }

  async deleteTest(id: string) {
    return firstValueFrom(
      this.httpClient.delete(`${this.endPoint}/${id}`)
    );
  }

  async createTest(test: any) {
    return firstValueFrom(
      this.httpClient.post(this.endPoint, test)
    );
  }

  async updateTest(test: any) {
    return firstValueFrom(
      this.httpClient.put(`${this.endPoint}/${test.id_test}`, test)
    );
  }
}
