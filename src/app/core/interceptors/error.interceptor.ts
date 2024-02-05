import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { StatusCode } from "../constants/constants";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private tost: ToastrService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.status === StatusCode.Unauthorized || event.status === StatusCode.Forbidden) {
              this.tost.error('Session Expired..!');
              this.navigateToLogin();
            }
          }
          return event;
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === StatusCode['Unauthorized'] || error.status === StatusCode['Forbidden']) {
            this.tost.error('Session Expired..!');
            this.navigateToLogin();
          }
        }
      }));
  }

  private navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}