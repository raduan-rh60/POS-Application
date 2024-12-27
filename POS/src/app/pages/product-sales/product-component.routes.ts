import { Routes } from '@angular/router';

// ui

import { PosComponent } from './generate-sale/pos.component';
import { GeneralSalesComponent } from './general-sales/general-sales.component';
import { ReturnListComponent } from './return-list/return-list.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { ProductDamageListComponent } from './product-damage-list/product-damage-list.component';
import { ProductStockListComponent } from './product-stock-list/product-stock-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import {OnlineSalesComponent} from "./online-sales/online-sales.component";
import {ReturnFormComponent} from "./return-form/return-form.component";

export const ProductComponent: Routes = [
  {
    path: '',
    children: [
      {
        path: 'general-sales',
        component: GeneralSalesComponent,
      },
      {
        path: 'pos',
        component: PosComponent,
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
        path: 'online-sales',
        component: OnlineSalesComponent,
      },

      {
        path: 'order-details/:id',
        component: OrderDetailsComponent,
      },
      {
        path: 'return-form/:id',
        component: ReturnFormComponent,
      },
    ],
  },
];
