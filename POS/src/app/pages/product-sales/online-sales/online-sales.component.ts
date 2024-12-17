import {Component, OnInit} from '@angular/core';
import {OrderData} from "../order-details/order-details.component";
import {OrderService} from "../generate-sale/service/order.service";
import {DatePipe, DecimalPipe} from "@angular/common";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-online-sales',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatIconButton,
    PrimeTemplate,
    TableModule
  ],
  templateUrl: './online-sales.component.html',
  styleUrl: './online-sales.component.scss'
})
export class OnlineSalesComponent implements OnInit {
   onlineSale: OrderData[]=[];

  constructor(private  onlineSaleService:OrderService) {}

  ngOnInit(): void {
    this.fetchAllSales()
  }

  fetchAllSales(): void {
    this. onlineSaleService.findOnlineSales().subscribe((res:OrderData[])=>{
      this. onlineSale=res;
      console.log(this. onlineSale);
    })
  }

  subTotalPurchasePriceSum(saleItems:OrderData): number {
    // console.log(saleItems.orderItems[].subtotalPurchasePrice);
    return saleItems.orderItems.reduce((sum, item) => {
      return sum + (item.subtotalPurchasePrice || 0); // Safely add the subtotalPurchasePrice, assuming it can be null or undefined
    }, 0);
  }

  deleteInvoice(id:number){
    this.onlineSaleService.deleteSale(id).subscribe(res=>{
      alert("delete Successful");
      this.fetchAllSales()
    })
  }
}
