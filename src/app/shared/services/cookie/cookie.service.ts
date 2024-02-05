import { Injectable } from "@angular/core";
import { AuthenticationResponse } from "src/app/models/user.model";
import { IExpiresTime } from "src/app/models/common.model";
import { CookieService } from 'ngx-cookie-service';
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: 'root',
})
export class CookieStoreService {

  constructor(private cookieService: CookieService) { }

  //function for setting the expiry time.
  private getExpiry(minutes: number): IExpiresTime {
    const currentDate: IExpiresTime = { expires: new Date() };
    currentDate.expires.setMinutes(currentDate.expires.getMinutes() + minutes);
    return currentDate;
  }

  // * *saving of the cookie*/
  public setCookie(key: string, value: string) {
    const expiry: IExpiresTime = this.getExpiry(environment.cookieExpiry);
    this.cookieService.set(key, value, expiry);
  }

  // * fetching of the cookie **/
  public getCookie(key: string): any {
    return this.cookieService.get(key);
  }

  // *removing the cookie**/
  public deleteCookie(key: string) {
    this.cookieService.delete(key);
  }

  // * delete All the Cookies **/
  public deleteAllCookies() {
    this.cookieService.deleteAll();
  }

  // * update cookie value
  public updateUserCookie(key: string, user: AuthenticationResponse) {
    this.cookieService.delete(key);
    this.setCookie(
      key,
      JSON.stringify(user)
    );
  }
}


