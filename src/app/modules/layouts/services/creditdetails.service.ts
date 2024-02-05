import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Credit } from 'src/app/models/credit.model';


@Injectable({
  providedIn: 'root'
})
export class CreditdetailsService {
  private apiUrl = ''; // Replace with your API base URL

  constructor(private http: HttpClient) { }


  // CREATE
  addCredit(credit: Credit): Observable<Credit> {
    return this.http.post<Credit>(`credit`, credit);
  }

  // READ
  getCreditList(): Observable<Credit[]> {
    return this.http.get<Credit[]>(`credit/published`);
  }

  getCredit(id: number): Observable<Credit> {
    return this.http.get<Credit>(`credit/${id}`);
  }

  // UPDATE
  updateCredit(id: number, credit: Credit): Observable<Credit> {
    return this.http.put<Credit>(`credit/${id}`, credit);
  }

  // DELETE
  deleteCredit(id: number): Observable<unknown> {
    return this.http.delete(`credit/${id}`);
  }

  
}

