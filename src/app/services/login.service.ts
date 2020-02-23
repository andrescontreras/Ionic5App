import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserCreation, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  registration(user: UserCreation): Observable<any> {
    const url = this.baseUrl + 'auth/registration/';
    const headers = this.GetHttpHeaders().set(
      'Content-Type',
      'application/json'
    );
    return this.http.post(url, user, {
      headers,
      observe: 'response'
    });
  }

  login(user: User): Observable<any> {
    const url = this.baseUrl + 'auth/login/';
    const headers = this.GetHttpHeaders().set(
      'Content-Type',
      'application/json'
    );
    return this.http.post(url, user, {
      headers,
      observe: 'response'
    });
  }

  changePassword(user: User): Observable<any> {
    const url = this.baseUrl + 'password/change/';
    const headers = this.GetHttpHeaders().set(
      'Content-Type',
      'application/json'
    );
    return this.http.post(url, user, {
      headers,
      observe: 'response'
    });
  }

  logout(): Observable<any> {
    const url = this.baseUrl + 'auth/logout/';
    const headers = this.GetHttpHeaders().set(
      'Content-Type',
      'application/json'
    );
    return this.http.post(url, {
      observe: 'response'
    });
  }
  public GetHttpHeaders(): HttpHeaders {
    return new HttpHeaders({});
  }
}
