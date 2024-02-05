import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor as MainHttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialService } from 'src/app/shared/services/credential/credential.service';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class HttpInterceptor implements MainHttpInterceptor {
  constructor(
    private credentialService: CredentialService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = this.credentialService.token || '';
    const lang: string = 'en';
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Authorization', token);
    headers = headers.set('locale', lang);

    // avoiding the cloning twice.
    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({ headers });
      request = request.clone({ url: `${environment.apiUrl}${request.url}` });
    }
    else {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Authorization': token,
        },
      });
    }
    return next.handle(request);
  }
}
