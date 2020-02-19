import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { HandleErrorService } from './handle-error.service';
//import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  baseUrl = environment.baseUrl;
  constructor(
    private auth: AuthService, //,public router: Router
    private handleErrorService: HandleErrorService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headerName = 'Authorization';
    const token = sessionStorage.getItem('Token');
    if (request.url === `${this.baseUrl}signin`) {
      return next.handle(request);
    }
    if (token !== null && !request.headers.has(headerName)) {
      request = request.clone({
        headers: request.headers.set(headerName, 'Token ' + token)
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleErrorService.interceptError(error);
        return next.handle(request);
      })
    );
  }
}
