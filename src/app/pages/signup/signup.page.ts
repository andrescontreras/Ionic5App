import { Component, OnInit } from '@angular/core';

import { from } from 'rxjs';
import { UserCreation, User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  user: UserCreation;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.user = new UserCreation();
  }

  createAccount = async () => {
    if (!this.validateData()) {
      console.log('Errror');
    }
    const user = new User();
    user.username = this.user.user;
    user.password = this.user.password;
    console.log('Correcto');
    // const response = await this.loginService.registration(user).toPromise();
    this.router.navigate(['index/login']);
  };

  validateData = () => {
    return (
      this.user.user.trim() &&
      this.user.password.trim() &&
      this.user.confirmPassword.trim() &&
      this.user.password.trim() === this.user.confirmPassword.trim()
    );
  };
}
