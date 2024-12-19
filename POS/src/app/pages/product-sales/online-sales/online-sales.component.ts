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
   grandTotalSale:number;
   grandTotalPurchase:number;
   profit:number;
  constructor(private  onlineSaleService:OrderService) {}

  ngOnInit(): void {
    this.fetchAllSales()
  }

  fetchAllSales(): void {
    this. onlineSaleService.findOnlineSales().subscribe((res:OrderData[])=>{
      this. onlineSale=res;
      this.grandTotalSale = this.onlineSale.reduce((acc, order) => acc + order.totalAmount, 0);
      this.grandTotalPurchase = this.onlineSale.reduce((acc, order) => acc + order.totalPurchasePrice, 0);
      this.profit = this.grandTotalSale - this.grandTotalPurchase;
    })
  }


  deleteInvoice(id:number){
    this.onlineSaleService.deleteSale(id).subscribe(res=>{
      alert("delete Successful");
      this.fetchAllSales()
    })
  }
}
