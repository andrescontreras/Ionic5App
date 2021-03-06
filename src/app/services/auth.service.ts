import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { tap, delay, catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { ToastService } from './toast.service';

const ERROR_LOGIN = 'Usuario o contraseña invalida';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private loginService: LoginService, private router: Router, private toastService: ToastService) {}

  login(user: User) {
    return this.loginService.login(user).pipe(
      map(response => {
        sessionStorage.setItem('User', user.username);
        this.loginProccess(response);
      }),
      catchError(this.handleError)
    );
  }

  loginProccess = response => {
    sessionStorage.setItem('Token', response.body.key);
    this.isLoggedIn = true;
    this.router.navigate(['/home']);
  };

  handleError = (error: any) => {
    if (error.status === 400) {
      this.toastService.presentError(ERROR_LOGIN);
      console.log('ERRROR');
    }

    return throwError('devMessage');
  };

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
