import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppNewCustomersComponent } from 'src/app/components/sale-target/new-customers.component';
import { AppTotalIncomeComponent } from 'src/app/components/month-income-compare/total-income.component';
import { AppRevenueProductComponent } from 'src/app/components/revenue-product/revenue-product.component';
import { AppRevenueForecastComponent } from 'src/app/components/revenue-forecast/revenue-forecast.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Transaction {
  shopName: string;
  sales: number;
  delete:boolean
}




@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [
    MaterialModule,
    AppNewCustomersComponent,
    AppTotalIncomeComponent,
    AppRevenueProductComponent,
    AppRevenueForecastComponent,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})


export class StarterComponent {
  currency:string = "Tk"
  totalSold:number = 12500;
  displayedColumns: string[] = ['shopName', 'sales'];
  transactions: Transaction[] = [
    {shopName: 'Beach ball', sales: 4, delete:false},
    {shopName: 'Towel', sales: 5,delete:true},
    {shopName: 'Frisbee', sales: 2,delete:true}
  ];


  // decimalPipe = new DecimalPipe('en-US');

  // /** Data accessor function that transforms the weight value to have at most 2 decimal digits. */
  // getWeight = (data: PeriodicElement): string => {
  //   const result = this.decimalPipe.transform(data.weight, '1.0-2');
  //   return result === null ? '' : result;
  // }
}
