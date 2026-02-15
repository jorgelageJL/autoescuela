import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PreguntaService {

  endpoint = 'http://localhost:8080/api/preguntas';

  constructor(private httpClient: HttpClient){}

  getPreguntasByTest(id: number){
    return this.httpClient.get(`${this.endpoint}/test/${id}`);
  }

}
