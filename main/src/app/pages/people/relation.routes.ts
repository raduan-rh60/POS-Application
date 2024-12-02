import { Routes } from '@angular/router';

// ui
import { CustomerComponent } from './customer/customer.component';
import { SupplierComponent } from './supplier/supplier.component';


export const RelationComponent: Routes = [
  {
    path: '',
    children: [
    
      {
        path: 'customer',
        component: CustomerComponent,
      },
      {
        path: 'supplier',
        component: SupplierComponent,
      }
      
    ],
  },
];
