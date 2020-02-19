import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { tap, delay, catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

const ERROR_LOGIN = 'Usuario o contraseña invalida';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private loginService: LoginService,
    private router: Router // private modalService: NgbModal
  ) {}

  login(user: User) {
    return this.loginService.login(user).pipe(
      map(response => {
        sessionStorage.setItem('User', response.body.user.username);
        sessionStorage.setItem('Token', response.body.token);
        this.isLoggedIn = true;
      })
      // catchError(this.handleError)
    );
  }

  handleError(error: any) {
    if (error.status === 401) {
      this.openModal(ERROR_LOGIN);
    }

    return throwError('devMessage');
  }

  logout() {
    return this.loginService.logout().pipe(
      map(response => {
        sessionStorage.removeItem('User');
        sessionStorage.removeItem('Token');
        this.isLoggedIn = false;
      }),
      catchError(this.handleError)
    );
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    console.log('ROUTE: ', this.router.url);
    if (isLoggedIn) {
      this.isLoggedIn = true;
      // this.router.navigate(['/servicios']);
    } else {
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }

  IsLoggedIn() {
    if (sessionStorage.getItem('Token')) {
      console.log('Autenticado anteriormente');
      this.setIsLoggedIn(true);
    } else {
      console.log('No autenticado');
      this.setIsLoggedIn(false);
    }
  }

  openModal(mensaje) {
    // const modalRef = this.modalService.open(ModalComponent, {
    //   backdrop: 'static'
    // });
    // modalRef.componentInstance.descripcion = mensaje;
  }
}
