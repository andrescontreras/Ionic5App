export class UserCreation {
  constructor(
    public email: string = '',
    public username: string = '',
    public password1: string = '',
    public password2: string = ''
  ) {}
}

export class User {
  constructor(public username: string = '', public password: string = '') {}
}

export class UserAccount {
  constructor(
    public pk: string = '',
    public username: string = '',
    public first_name: string = '',
    public last_name: string = '',
    public email: string = '',
    public phone_number: string = ''
  ) {}
}
