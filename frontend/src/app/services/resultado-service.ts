import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultadoService {
  endPoint: string = 'http://localhost:8080/api/resultados';

  constructor(
    private httpClient: HttpClient,
  ) { }

  async getAllResultados() {
    return firstValueFrom(
      this.httpClient.get(this.endPoint)
    );
  }

  async deleteResultado(id_test: string, id_alumno: string) {
    return firstValueFrom(
      this.httpClient.delete(`${this.endPoint}/${id_test}/${id_alumno}`)
    );
  }

  async createResultado(resultado: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<any>(this.endPoint, resultado)
    );
  }

  async updateResultado(resultado: any) {
    return firstValueFrom(
      this.httpClient.put(`${this.endPoint}/${resultado.id_test}/${resultado.id_alumno}`, resultado)
    );
  }
}
