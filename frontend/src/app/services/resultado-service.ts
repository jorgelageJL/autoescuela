import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ResultadoService {
  endPoint: string = 'http://localhost:8080/api/resultados';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  async getAllResultados() {
    return firstValueFrom(
      this.httpClient.get(this.endPoint, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }

  async deleteResultado(id_test: string, id_alumno: string) {
    return firstValueFrom(
      this.httpClient.delete(`${this.endPoint}/${id_test}/${id_alumno}`, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }

  async createResultado(resultado: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<any>(this.endPoint, resultado, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }

  async updateResultado(resultado: any) {
    return firstValueFrom(
      this.httpClient.put(`${this.endPoint}/${resultado.id_test}/${resultado.id_alumno}`, resultado, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }
}
