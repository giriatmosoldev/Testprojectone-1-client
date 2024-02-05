import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from 'src/app/models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductformService {
  private apiUrl = ''; // Replace with your API base URL

  constructor(private http: HttpClient) { }


  // CREATE
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`product`, product);
  }

  // READ
  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`product/published`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`product/${id}`);
  }

  // UPDATE
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`product/${id}`, product);
  }

  // DELETE
  deleteProduct(id: number): Observable<unknown> {
    return this.http.delete(`product/${id}`);
  }

  
}

