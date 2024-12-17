import { Routes } from '@angular/router';

// ui

import { GenerateSaleComponent } from './generate-sale/generate-sale.component';
import { AllSalesComponent } from './all-sales/all-sales.component';
import { ReturnListComponent } from './return-list/return-list.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { ProductDamageListComponent } from './product-damage-list/product-damage-list.component';
import { ProductStockListComponent } from './product-stock-list/product-stock-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

export const ProductComponent: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all-sales',
        component: AllSalesComponent,
      },
      {
        path: 'pos',
        component: GenerateSaleComponent,
      },
      {
        path: 'return',
        component: ReturnListComponent,
      },
      
      {
        path: 'purchase-list',
        component: PurchaseListComponent,
      },
      {
        path: 'damage',
        component: ProductDamageListComponent,
      },
      {
        path: 'stock',
        component: ProductStockListComponent,
      },
      {
        path: 'order-details/:id',
        component: OrderDetailsComponent,
      },
    ],
  },
];
