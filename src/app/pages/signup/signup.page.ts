import { Component, OnInit } from '@angular/core';

import { from, throwError } from 'rxjs';
import { UserCreation, User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { catchError, map, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  user: UserCreation = new UserCreation();
  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastService,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user.username = '';
    this.user.email = '';
    this.user.password1 = '';
    this.user.password2 = '';
  }

  createAccount = async () => {
    if (!this.validateData()) {
      console.log('Errror');
      this.toastService.presentError('Los datos ingresados son invalidos');
      return;
    }

    console.log('Correcto');
    this.spinner.show();
    const response = await this.loginService
      .registration(this.user)
      .pipe(catchError(this.handleError))
      .toPromise();

    this.spinner.hide();
    this.toastService.presentSuccess('Account created successfully');
    sessionStorage.setItem('User', this.user.username);
    this.authService.loginProccess(response);

    //this.router.navigate(['index/login']);
  };

  validateData = () => {
    return (
      this.user.username.trim() &&
      this.user.password1.trim() &&
      this.user.password2.trim() &&
      this.user.password1.trim() === this.user.password2.trim()
    );
  };

  handleError = (error: any) => {
    if (error.status !== 400) {
      return throwError('Innesperate error');
    }

    const stringError = this.generateErrorMessage(error);
    this.toastService.presentError(stringError);
    this.spinner.hide();
    return throwError(stringError);
  };

  generateErrorMessage = error => {
    const keys = Object.keys(error.error);
    // recorrer todas las llaves y concatenar sus respectivos mensajes
    let stringError = '';
    keys.forEach(key => {
      stringError = stringError + error.error[key].reduce((message, item) => message + '\n' + item) + '\n';
    });
    return stringError;
  };
}
