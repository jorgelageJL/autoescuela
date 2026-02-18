import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  endPoint: string = 'http://localhost:8080/api';

  constructor(
    private httpClient: HttpClient,
  ) { }

  async getAllAlumnos() {
    return firstValueFrom(
      this.httpClient.get(`${this.endPoint}/alumnos`)
    );
  }

  async getAllProfesors() {
    return firstValueFrom(
      this.httpClient.get(`${this.endPoint}/profesors`)
    );
  }

  async getAllAdministradors() {
    return firstValueFrom(
      this.httpClient.get(`${this.endPoint}/administradors`)
    );
  }

  async deleteAlumno(id: string) {
    return firstValueFrom(
      this.httpClient.delete(`${this.endPoint}/alumnos/${id}`)
    );
  }

  async deleteProfesor(id: string) {
    return firstValueFrom(
      this.httpClient.delete(`${this.endPoint}/profesors/${id}`)
    );
  }

  async deleteAdministrador(id: string) {
    return firstValueFrom(
      this.httpClient.delete(`${this.endPoint}/administradors/${id}`)
    );
  }

  async createAlumno(usuario: any) {
    return firstValueFrom(
      this.httpClient.post(`${this.endPoint}/alumnos`, usuario)
    );
  }

  async createProfesor(usuario: any) {
    return firstValueFrom(
      this.httpClient.post(`${this.endPoint}/profesors`, usuario)
    );
  }

  async createAdministrador(usuario: any) {
    return firstValueFrom(
      this.httpClient.post(`${this.endPoint}/administradors`, usuario)
    );
  }

  async updateAlumno(usuario: any) {
    // let formData = new FormData();
    // formData.append("id_alumno", alumno.id_alumno);
    // formData.append("nombre", alumno.nombre);
    // formData.append("apellidos", alumno.apellidos);
    // formData.append("dni", alumno.dni);
    // formData.append("email", alumno.email);
    // formData.append("password", alumno.password);
    // formData.append("id_profesor", alumno.id_profesor);
    // console.log(formData)
    return firstValueFrom(
      this.httpClient.put(`${this.endPoint}/alumnos/${usuario.id_alumno}`, usuario)
    );
  }

  async updateProfesor(usuario: any) {
    return firstValueFrom(
      this.httpClient.put(`${this.endPoint}/profesors/${usuario.id_profesor}`, usuario)
    );
  }

  async updateAdministrador(usuario: any) {
    return firstValueFrom(
      this.httpClient.put(`${this.endPoint}/administradors/${usuario.id_admin}`, usuario)
    );
  }
}
