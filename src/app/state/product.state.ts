import { computed, Injectable, signal } from '@angular/core';
import { ProductStateModel } from '../models/products.model';
import { setErrorMessage } from '../utils/error';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';



@Injectable({ providedIn: 'root' })
export class ProductState {
    private initialState: ProductStateModel = {
        address: {
            street: '',
            suite: '',
            city: '',
            zipcode: '',
            geo: {
                lat: '',
                lng: ''
            }
        },
        loading: true,
        error: null,
        id: 0,
        name: '',
        email: '',
        website: '',
        username: '',
        products: undefined
    };

    // Signal that holds the state object
    private state = signal<ProductStateModel>(this.initialState);

    // Computed signals (selectors)
    products = computed(() => this.state().products);
    isLoading = computed(() => this.state().loading);
    error = computed(() => this.state().error);

    // Methods to update state
    setLoading(loading: boolean) {
        this.state.update(state => ({
            ...state,
            loading,
        }));
    }

    setProducts(products: ProductStateModel[]) {
        this.state.update(state => ({
            ...state,
            products,
            loading: false,
            error: null,
        }));
    }

    addProduct(product: ProductStateModel) {
        this.state.update(state => ({
            ...state,
            products: [...state.products, product],
        }));
    }

    updateProduct(updatedProduct: ProductStateModel) {
        this.state.update(state => ({
            ...state,
            products: state.products.map((product: { id: number; }) =>
                product.id === updatedProduct.id ? updatedProduct : product
            ),
        }));
    }

    deleteProduct(productId: number) {
        this.state.update(state => ({
            ...state,
            products: state.products.filter((product: { id: number; }) => product.id !== productId),
        }));
    }

    setError(err: HttpErrorResponse) {
        const errorMessage = setErrorMessage(err);
        this.state.update(state => ({
            ...state,
            error: errorMessage
        }))
        return of([]);
    }
}