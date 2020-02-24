import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
// import { any } from '../SideCar/any';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl = environment.baseUrl + 'api/task/';
  headers = this.GetHttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  postTask(task: Task): Observable<any> {
    return this.http.post(this.baseUrl, task, {
      headers: this.headers,
      observe: 'response'
    });
  }

  putTask(task: Task): Observable<any> {
    return this.http.put(this.baseUrl, task, {
      headers: this.headers,
      observe: 'response'
    });
  }

  patchTask(task: Task): Observable<any> {
    return this.http.patch(this.baseUrl, task, {
      headers: this.headers,
      observe: 'response'
    });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id, {
      headers: this.headers,
      observe: 'response'
    });
  }

  getTask(): Observable<HttpResponse<Task[]>> {
    return this.http.get<Task[]>(this.baseUrl, {
      headers: this.headers,
      observe: 'response'
    });
  }

  getTaskById(id: string): Observable<HttpResponse<Task>> {
    return this.http.get<Task>(this.baseUrl + id, {
      headers: this.headers,
      observe: 'response'
    });
  }

  public GetHttpHeaders(): HttpHeaders {
    return new HttpHeaders({});
  }
}
