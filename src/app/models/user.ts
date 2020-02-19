export class UserCreation {
  constructor(
    public name: string = '',
    public user: string = '',
    public password: string = '',
    public confirmPassword: string = ''
  ) {}
}

export class User {
  constructor(public username: string = '', public password: string = '') {}
}
