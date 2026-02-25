import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  endPoint: string = 'http://localhost:8080/api';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  async getAllAlumnos() {
    return firstValueFrom(
      this.httpClient.get(`${this.endPoint}/alumnos`, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }

  async getAllProfesors() {
    return firstValueFrom(
      this.httpClient.get(`${this.endPoint}/profesors`, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }

  async getAllAdministradors() {
    return firstValueFrom(
      this.httpClient.get(`${this.endPoint}/administradors`, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }

  async deleteAlumno(id: number) {
    return firstValueFrom(
      this.httpClient.delete(`${this.endPoint}/alumnos/${id}`, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }

  async deleteProfesor(id: number) {
    return firstValueFrom(
      this.httpClient.delete(`${this.endPoint}/profesors/${id}`, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }

  async deleteAdministrador(id: string) {
    return firstValueFrom(
      this.httpClient.delete(`${this.endPoint}/administradors/${id}`, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }

  async createAlumno(usuario: any) {
    return firstValueFrom(
      this.httpClient.post(`${this.endPoint}/alumnos`, usuario, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }

  async createProfesor(usuario: any) {
    return firstValueFrom(
      this.httpClient.post(`${this.endPoint}/profesors`, usuario, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }

  async createAdministrador(usuario: any) {
    return firstValueFrom(
      this.httpClient.post(`${this.endPoint}/administradors`, usuario, this.authService.getBearerHeaders(await this.authService.getToken()))
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
      this.httpClient.put(`${this.endPoint}/alumnos/${usuario.id_alumno}`, user, this.authService.getBearerHeaders(await this.authService.getToken()))
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
      this.httpClient.put(`${this.endPoint}/profesors/${usuario.id_profesor}`, user, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }

  async updateAdministrador(usuario: any) {
    return firstValueFrom(
      this.httpClient.put(`${this.endPoint}/administradors/${usuario.id_admin}`, usuario, this.authService.getBearerHeaders(await this.authService.getToken()))
    );
  }
}
