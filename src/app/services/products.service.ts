import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ProductStateModel } from '../models/products.model';


@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';


 private http=inject(HttpClient);

  getProducts(): Observable<ProductStateModel[]> {
    return this.http.get<ProductStateModel[]>(this.apiUrl);
  }

  addProduct(product: ProductStateModel): Observable<ProductStateModel> {
    return this.http.post<ProductStateModel>(this.apiUrl, product);
  }

  updateProduct(product: ProductStateModel): Observable<ProductStateModel> {
    return this.http.put<ProductStateModel>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }
}