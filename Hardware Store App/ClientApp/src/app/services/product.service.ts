import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private APIUrl: string = environment.baseAPIUrl + "/api/product";

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.APIUrl);
  }

  getProduct(id: number) {
    return this.http.get<Product[]>(this.APIUrl + `/${id}`);
  }

  getReviews(productId: number) {
    return this.http.get(this.APIUrl + `/reviews/${productId}`);
  }
}
