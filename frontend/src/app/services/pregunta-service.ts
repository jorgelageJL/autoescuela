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

  async getAllPreguntasDelTest(id_test: string): Promise<any[]> {
    return await firstValueFrom(
      this.httpClient.get<any[]>(`${this.endPoint}/id_test/${id_test}`)
    );
  }

  async deletePregunta(id: string) {
    return firstValueFrom(
      this.httpClient.delete(`${this.endPoint}/${id}`)
    );
  }

  async createPregunta(pregunta: any, blob: any) {
    let formData = new FormData();
    formData.append("enunciado", pregunta.enunciado);
    formData.append("opcion_a", pregunta.opcion_a);
    formData.append("opcion_b", pregunta.opcion_b);
    formData.append("opcion_c", pregunta.opcion_c);
    formData.append("respuesta", pregunta.respuesta);
    formData.append("tema", pregunta.tema);
    formData.append("id_test", pregunta.id_test);
    formData.append("filename", blob, "photo.jpg");
    return firstValueFrom(
      this.httpClient.post(this.endPoint, formData)
    );
  }

  async updatePregunta(pregunta: any, blob: any) {
    let formData = new FormData();
    formData.append("id_pregunta", pregunta.id_pregunta);
    formData.append("enunciado", pregunta.enunciado);
    formData.append("opcion_a", pregunta.opcion_a);
    formData.append("opcion_b", pregunta.opcion_b);
    formData.append("opcion_c", pregunta.opcion_c);
    formData.append("respuesta", pregunta.respuesta);
    formData.append("tema", pregunta.tema);
    formData.append("id_test", pregunta.id_test);
    if (blob) {
      formData.append("filename", blob, "photo.jpg");
    }
    return firstValueFrom(
      this.httpClient.put(`${this.endPoint}/${pregunta.id_pregunta}`, formData)
    );
  }
}
