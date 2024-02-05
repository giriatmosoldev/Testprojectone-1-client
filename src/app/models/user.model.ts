
export class AuthenticationRequest {
  public username: string = '';
  public password: string = ''
}

export class User extends AuthenticationRequest {
  public id: number = 0;
  public firstname: string = '';
  public lastname: string = '';
  public phone: string = '';
}

export class AuthenticationResponse {
  public user: User = new User();
  public token: string = '';
}

export class ForgotPasswordModel {
  public email: string = '';
}

export class ResetPasswordModel {
  public token!: string;
  public password!: string;
  public confirmpassword!: string;
}

export class SignupFormModel {
  firstname!: string;
  lastname!: string;
  companyName!: string;
  phone!: string;
  email!: string;
  password!: string;
  confirmpassword!: string;
  tncchecklist!: boolean;
}