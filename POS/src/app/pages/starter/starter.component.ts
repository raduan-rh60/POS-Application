import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {AppNewCustomersComponent} from 'src/app/components/sale-target/new-customers.component';
import {AppTotalIncomeComponent} from 'src/app/components/month-income-compare/total-income.component';
import {AppRevenueProductComponent, productsData} from 'src/app/components/revenue-product/revenue-product.component';
import {AppRevenueForecastComponent} from 'src/app/components/revenue-forecast/revenue-forecast.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {DatePipe, DecimalPipe} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ProductService} from '../product-info/product-lists/service/product.service';
import {OrderService} from '../product-sales/generate-sale/service/order.service';
import {PurchaseService} from '../product-sales/purchase-list/service/purchase.service';
import {DamageService} from '../product-sales/product-damage-list/service/damage-service';
import {ReturnService} from "../product-sales/return-form/serivce/return.service";

interface Transaction {
  shopName: string;
  sales: number;
  delete: boolean
}


@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [
    MaterialModule,
    AppRevenueProductComponent,
    AppRevenueForecastComponent,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    DecimalPipe,
  ],
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})


export class StarterComponent implements OnInit {
  ngOnInit(): void {
    this.findProduct();
    this.findPurchase();
    this.damage();
    this.getAllReturns();
  }

  constructor(private saleService: OrderService,
              private purchaseService: PurchaseService,
              private damageService: DamageService,
              private returnService: ReturnService) {

  }


  currency: string = "Tk"
  totalSold: number;
  totalPurchase: number;
  totalDamageProducts: number;
  totalReturnAmount: number;
  displayedColumns: string[] = ['shopName', 'sales'];
  transactions: Transaction[] = [
    {shopName: 'Beach ball', sales: 4, delete: false},
    {shopName: 'Towel', sales: 5, delete: true},
    {shopName: 'Frisbee', sales: 2, delete: true}
  ];

  findProduct() {
    this.saleService.findallSales().subscribe(res => {
      this.totalSold = res.reduce((acc, price) => acc + price.totalAmount, 0);

    })
  }

  findPurchase() {
    this.purchaseService.getAllPurchases().subscribe(res => {
      console.log(res);
      this.totalPurchase = res.reduce((acc, purchase) => {
        // Log each purchase and its sub_total to verify it's being read correctly
        console.log('Purchase SubTotal:', purchase.sub_total);

        // Ensure subTotal is a valid number, default to 0 if not
        const subTotal = (typeof purchase.sub_total === 'number' && !isNaN(purchase.sub_total))
          ? purchase.sub_total
          : 0;

        return acc + subTotal; // Add the sub_total to the accumulator
      }, 0);

    })
  }

  damage() {
    this.damageService.getDamageList().subscribe(res => {
      this.totalDamageProducts = res.reduce((acc, damage) => acc + damage.quantity, 0);
      console.log(res);
    })
  }

  // decimalPipe = new DecimalPipe('en-US');

  // /** Data accessor function that transforms the weight value to have at most 2 decimal digits. */
  // getWeight = (data: PeriodicElement): string => {
  //   const result = this.decimalPipe.transform(data.weight, '1.0-2');
  //   return result === null ? '' : result;
  // }

  public getAllReturns(){
    this.returnService.getReturn().subscribe(res=>{

      this.totalReturnAmount = res.reduce((sum:number, item:any) => sum + item.returnAmount, 0);

    })
  }
}
