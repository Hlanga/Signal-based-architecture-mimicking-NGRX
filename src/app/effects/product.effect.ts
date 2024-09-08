
import { catchError, of, tap } from 'rxjs';
import {  ProductStateModel } from '../models/products.model';
import { ProductService } from '../services/products.service';
import { ProductState } from '../state/product.state';
import { Injectable, inject } from '@angular/core';



@Injectable({ providedIn: 'root' })
export class ProductEffects {
    private productService=inject(ProductService);
    private productState=inject(ProductState) ;

    loadProducts$() {
        return this.productService.getProducts().pipe(
          tap(() => this.productState.setLoading(true)),
          tap((products: ProductStateModel[]) => this.productState.setProducts(products)),
          catchError(error => {
            this.productState.setError(error);
            return of([]);
          }),
          tap(() => this.productState.setLoading(false))
        );
      }
    
      addProduct$(product: ProductStateModel) {
        return this.productService.addProduct(product).pipe(
          tap((newProduct: ProductStateModel) => this.productState.addProduct(newProduct)),
          catchError(error => {
            this.productState.setError(error);
            return of(null);
          })
        );
      }
    
      updateProduct$(product: ProductStateModel) {
        return this.productService.updateProduct(product).pipe(
          tap((updatedProduct: ProductStateModel) => this.productState.updateProduct(updatedProduct)),
          catchError(error => {
            this.productState.setError(error);
            return of(null);
          })
        );
      }
    
      deleteProduct$(productId: number) {
        return this.productService.deleteProduct(productId).pipe(
          tap(() => this.productState.deleteProduct(productId)),
          catchError(error => {
            this.productState.setError(error);
            return of(null);
          })
        );
      }
}
