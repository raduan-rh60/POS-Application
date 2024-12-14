import { Routes } from '@angular/router';

// ui
import { AppProductListsComponent } from './product-lists/lists.component';

import { CategoryAndBrandsComponent } from './category-and-brands/category-and-brands.component';


export const ProductComponent: Routes = [
  {
    path: '',
    children: [
    
      {
        path: 'product-lists',
        component: AppProductListsComponent,
      },
      {
        path: 'category-brands',
        component: CategoryAndBrandsComponent,
      }
      
    ],
  },
];
