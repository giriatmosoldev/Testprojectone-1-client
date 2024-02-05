import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationResponse, AuthenticationRequest, ResetPasswordModel, ForgotPasswordModel, SignupFormModel } from 'src/app/models/user.model';
import { HttpService } from 'src/app/shared/services/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpService
  ) { }

  public login(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post('authentication/login', request);
  }

  public resetpassword(request: ResetPasswordModel): Observable<any> {
    return this.http.post('', request);
  }

  public forgotpassword(request: ForgotPasswordModel): Observable<any> {
    return this.http.post('', request);
  }

  public signup(request: SignupFormModel): Observable<any> {
    return this.http.post('authentication', { username: request.email, password: request.password });
  }
}