import { Component, OnInit, ɵConsole } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  user: User;
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.user = new User();
  }

  login = () => {
    if (!this.validateData()) {
      console.log('DATOS VACIOS');
    }

    console.log('aaaaa');
    this.spinner.show();
    this.authService
      .login(this.user)
      .toPromise()
      .then(response => {
        console.log(response);
        this.router.navigate(['/home']);
        this.spinner.hide();
      })
      .catch(response => {
        console.log('error: ', response);
        this.spinner.hide();
      });
  };

  validateData = () => {
    return this.user.username.trim() && this.user.password.trim();
  };
}
