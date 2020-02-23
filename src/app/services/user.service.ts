import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserAccount } from '../models/user';
// import { any } from '../SideCar/any';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl + 'api/user/';
  headers = this.GetHttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  putUser(user: UserAccount): Observable<any> {
    return this.http.put(this.baseUrl, user, {
      headers: this.headers,
      observe: 'response'
    });
  }

  patchUser(user: UserAccount): Observable<any> {
    return this.http.patch(this.baseUrl, user, {
      headers: this.headers,
      observe: 'response'
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id, {
      headers: this.headers,
      observe: 'response'
    });
  }

  getUser(): Observable<HttpResponse<UserAccount[]>> {
    return this.http.get<UserAccount[]>(this.baseUrl, {
      headers: this.headers,
      observe: 'response'
    });
  }

  public GetHttpHeaders(): HttpHeaders {
    return new HttpHeaders({});
  }
}
