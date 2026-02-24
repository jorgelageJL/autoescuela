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

  async deleteAlumno(id: number) {
    return firstValueFrom(
      this.httpClient.delete(`${this.endPoint}/alumnos/${id}`)
    );
  }

  async deleteProfesor(id: number) {
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
    const user = {
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      dni: usuario.dni,
      email: usuario.email,
      password: usuario.password,
      id_profesor: usuario.id_profesor,
    };

    return firstValueFrom(
      this.httpClient.put(`${this.endPoint}/alumnos/${usuario.id_alumno}`, user)
    );
  }

  async updateProfesor(usuario: any) {
    const user = {
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      dni: usuario.dni,
      email: usuario.email,
      password: usuario.password,
      id_admin: usuario.id_admin,
    };

    return firstValueFrom(
      this.httpClient.put(`${this.endPoint}/profesors/${usuario.id_profesor}`, user)
    );
  }

  async updateAdministrador(usuario: any) {
    return firstValueFrom(
      this.httpClient.put(`${this.endPoint}/administradors/${usuario.id_admin}`, usuario)
    );
  }
}
