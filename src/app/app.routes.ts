import { Routes } from '@angular/router';
import { NotFoundComponent } from '@info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('@products/pages/list/list.component').then(m => m.ListComponent)
            },
            {
                path: 'about',
                loadComponent: () => import('@info/pages/about/about.component').then(m => m.AboutComponent)
            },
            {
                path: 'product/:productId',
                loadComponent: () => import('@products/pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];
