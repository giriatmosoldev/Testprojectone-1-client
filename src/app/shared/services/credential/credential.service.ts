
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CookieStoreService } from '../cookie/cookie.service';
import { CookieUserKey, CookieTokenKey } from 'src/app/core/constants/constants';
import { AuthenticationResponse } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CredentialService {
  private _credentials: AuthenticationResponse | null = null;
  private userLoginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private cookie: CookieStoreService
  ) { }

  /**
   * set credentials
   * @param credentials
   */
  public setCredentials(credentials: AuthenticationResponse | null) {
    this._credentials = credentials || null;
    if (credentials) {
      this.cookie.setCookie(
        CookieUserKey,
        JSON.stringify(credentials)
      );
      const token: string = this.credentials?.token
      this.cookie.setCookie(CookieTokenKey, 'Bearer ' + token);
    } else {
      this.cookie.deleteCookie(CookieUserKey);
    }
  }

  /**
   * *function to remove the credentials.
   */
  public removeCredentials() {
    this._credentials = null;
    this.cookie.deleteAllCookies();
  }


  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  public isAuthenticated(): boolean {
    return this.token !== '' && this.cookie.getCookie(CookieUserKey) !== null;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  public get credentials(): AuthenticationResponse {
    return this._credentials = JSON.parse(this.cookie.getCookie(CookieUserKey) as string || "{}");
  }

  // function to toggle the login status
  public toggleLoginStatus() {
    this.userLoginStatus.next(!this.userLoginStatus.value);
  }

  get token(): string {
    return this.cookie.getCookie(CookieTokenKey) || '';
  }

  get userId(): number {
    return this.credentials.user.id;
  }

}
