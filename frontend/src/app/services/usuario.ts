import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  //  ALUMNOS
  getAlumnos(): Observable<any> {
    return this.http.get(`${this.API_URL}/alumnos`);
  }

  getAlumno(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/alumnos/${id}`);
  }

  crearAlumno(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/alumnos`, data);
  }

  actualizarAlumno(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/alumnos/${id}`, data);
  }

  eliminarAlumno(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/alumnos/${id}`);
  }

  // PROFESORES
  getProfesores(): Observable<any> {
    return this.http.get(`${this.API_URL}/profesors`);
  }

  getProfesor(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/profesors/${id}`);
  }

  crearProfesor(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/profesors`, data);
  }

  actualizarProfesor(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/profesors/${id}`, data);
  }

  eliminarProfesor(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/profesors/${id}`);
  }

  // TESTS
  getTests(): Observable<any> {
    return this.http.get(`${this.API_URL}/tests`);
  }

  getTest(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/tests/${id}`);
  }

  crearTest(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/tests`, data);
  }

  actualizarTest(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/tests/${id}`, data);
  }

  eliminarTest(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/tests/${id}`);
  }

  // PREGUNTAS
  getPreguntas(): Observable<any> {
    return this.http.get(`${this.API_URL}/preguntas`);
  }

  getPregunta(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/preguntas/${id}`);
  }

  getPreguntasPorTest(id_test: number): Observable<any> {
    return this.http.get(`${this.API_URL}/preguntas/test/${id_test}`);
  }

  crearPregunta(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/preguntas`, data);
  }

  actualizarPregunta(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/preguntas/${id}`, data);
  }

  eliminarPregunta(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/preguntas/${id}`);
  }
}
