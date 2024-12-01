import { Routes } from '@angular/router';

// ui
import { AppChipsComponent } from './chips/chips.component';
import { AppProductListsComponent } from './product-lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { GenerateSaleComponent } from './generate-sale/generate-sale.component';
import { AllSalesComponent } from './all-sales/all-sales.component';
import { CategoryAndBrandsComponent } from './category-and-brands/category-and-brands.component';

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
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'priduct-lists',
        component: AppProductListsComponent,
      },
      {
        path: 'category-brands',
        component: CategoryAndBrandsComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tables',
        component: AppTablesComponent,
      },
    ],
  },
];
