import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserAccount } from 'src/app/models/user';
import { Field } from 'src/app/models/field';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss']
})
export class AccountPage implements OnInit {
  user: UserAccount = new UserAccount();
  fields: Field[];
  setFields = () => {
    this.fields = [
      new Field('User', this.user.username, 'username'),
      new Field('First Name', this.user.first_name, 'first_name'),
      new Field('Last Name', this.user.last_name, 'last_name'),
      new Field('Email', this.user.email, 'email'),
      new Field('Phone Number', this.user.phone_number, 'phone_number')
    ];
  };
  constructor(private userService: UserService, private toastService: ToastService) {}

  ngOnInit() {
    this.initializeFields();
    const a = new Field(null);
  }

  initializeFields = async () => {
    const response = await this.userService
      .getUser()
      .pipe(catchError(this.handleErrorGetUser))
      .toPromise();

    const username = sessionStorage.getItem('User');
    this.user = response.body.find(e => e.username === username);
    this.setFields();
  };

  handleErrorGetUser = (error: any) => {
    this.toastService.presentError('Innesperate error getting the users');
    return throwError('Innesperate error getting the users');
  };

  saveData = async () => {
    const response = await this.userService
      .putUser(this.user)
      .pipe(catchError(this.handleErrorSaveUser))
      .toPromise();
    this.toastService.presentSuccess('Account edit successfully');
  };

  handleErrorSaveUser = (error: any) => {
    this.toastService.presentError('Innesperate error editing the acconut');
    return throwError('Innesperate error editing the acconut');
  };
}
