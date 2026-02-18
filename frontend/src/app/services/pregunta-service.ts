import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreguntaService {
  endPoint: string = 'http://localhost:8080/api/preguntas';

  constructor(
    private httpClient: HttpClient,
  ) { }

  async getAllPreguntas() {
    return firstValueFrom(
      this.httpClient.get(this.endPoint)
    );
  }

  async deletePregunta(id: string) {
    return firstValueFrom(
      this.httpClient.delete(`${this.endPoint}/${id}`)
    );
  }

  async createPregunta(pregunta: any) {
    return firstValueFrom(
      this.httpClient.post(this.endPoint, pregunta)
    );
  }

  async updatePregunta(pregunta: any) {
    return firstValueFrom(
      this.httpClient.put(`${this.endPoint}/${pregunta.id_pregunta}`, pregunta)
    );
  }
}
