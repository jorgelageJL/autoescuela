import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../auth/user';
import { AuthResponse } from '../auth/auth-response';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { Storage } from '@ionic/storage-angular'
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  initializedStorage: boolean = false;
  endPoint: string = 'http://localhost:8080/api';
  // endPoint: string = 'http://localhost:8080/api/administradors';

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private router: Router
  ) { 
    this.initializeStorage();
  }

  async initializeStorage(){
    if (!this.initializedStorage) await this.storage.create();
    this.initializedStorage = true;
  }

  isInitializedStorage(){
    return this.initializedStorage;
  }

  private getBasicHeaders(user: User) {
    let base64UserAndPassword = window.btoa(user.email + ":" + user.password);
    let basicAccess = 'Basic ' + base64UserAndPassword;

    let options = {
      headers: {
        'Authorization': basicAccess,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      //, withCredentials: true
    };

    return options;
  }

  public getBearerHeaders(token: any) {
    let bearerAccess = 'Bearer ' + token;

    let options = {
      headers: {
        'Authorization': token ? bearerAccess : '',
        // 'Content-Type' : 'application/json',
      }
      , withCredentials: true
    };

    return options;
  }

  async canActivate(): Promise<boolean> {
    const loggedIn = await this.isLoggedIn();

    if (!loggedIn) {
      this.router.navigateByUrl('login');
      return false;
    }

    return true;
  }

  async hasPermiso(): Promise<boolean> {
    const rol = await this.getUserLogued();

    if (!rol.isAdmin) {
      this.router.navigateByUrl('login');
      return false;
    }

    return true;
  }

  register(user: User, rol: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.endPoint}/${rol}`, user, this.getBasicHeaders(user)).pipe(
      tap(async (res: AuthResponse) => {
        if (res.user) {
          await this.storage.set("token", res.access_token);
        }
      })

    );
  }

  // login(user: User): Observable<AuthResponse> {
  //   return this.httpClient.post<AuthResponse>(`${this.endPoint}/signin`, null, this.getBasicHeaders(user)).pipe(
  //     tap(async (res: AuthResponse) => {

  //       if (res.user) {
  //         await this.storage.set('user', res.user);
  //         await this.storage.set("token", res.access_token);
  //       }
  //     })
  //   );
  // }

  async login(user: User, rol: string): Promise<AuthResponse> {
    const res = await firstValueFrom(
      this.httpClient.post<AuthResponse>(
        `${this.endPoint}/${rol}/signin`, 
        null, 
        this.getBasicHeaders(user)
      )
    );

    res.user.rol = rol
    console.log(res.user)

    if (res.user) {
      await this.storage.set('user', res.user);
      await this.storage.set('token', res.access_token);
      await this.storage.set('rol', rol);
    }

    return res;
  }

  async logout() {
    await this.storage.remove("token");
    await this.storage.remove("user");
    this.router.navigateByUrl("login");
  }

  async getUserLogued() {
    return await this.storage.get("user");
  }

  async getToken() {
    let token = await this.storage.get("token");
    return token ? token : '';
  }

  async isLoggedIn() {
    let token = await this.storage.get("token");
    if (token) { //Just check if exists. This should be checked with current date
      return true;
    }
    return false;
  }
}
