import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private _http: HttpClient
  ) { }

  public get(url: string, params?: any): Observable<any> {
    return this._http
      .get<any>(url, params)
      .pipe(
        catchError((error: any) => {
          return this.errorHandler(error);
        })
      );
  }

  public post(url: string, params: any): Observable<any> {
    return this._http
      .post<any>(url, params, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          return this.errorHandler(error);
        })
      );
  }

  public put(url: string, params: any): Observable<any> {
    return this._http
      .put<any>(url, params, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          return this.errorHandler(error);
        })
      );
  }

  public delete(url: string): Observable<any> {
    return this._http
      .delete<any>(url, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          return this.errorHandler(error);
        })
      );
  }

  // error handler
  private errorHandler(error: any) {
    if (error.status === 0) {
      // Throw a custom error or return an error message to display to the user
      return throwError(() => {
        return new Error(`Unable to perform action!`);
      });
    } else {
      // Handle other types of errors if needed
      return throwError(() => {
        return new Error(error.error);
      });
    }
  }
}
