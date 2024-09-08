import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/productlist/productlist.component').then(m => m.ProductlistComponent)
    },
    {
        path: 'user',
        loadComponent: () => import('./components/user-detail/user-detail.component').then(m => m.UserDetailComponent)
    },
    
];
