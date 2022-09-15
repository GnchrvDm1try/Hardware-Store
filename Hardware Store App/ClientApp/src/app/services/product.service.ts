import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http: HttpClient;
  private readonly APIUrl: string = environment.baseAPIUrl + "/api/product";

  constructor(http: HttpClient) {
    this.http = http;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.APIUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.APIUrl + `/${id}`);
  }

  getReviews(productId: number) {
    return this.http.get(this.APIUrl + `/reviews/${productId}`);
  }
}
