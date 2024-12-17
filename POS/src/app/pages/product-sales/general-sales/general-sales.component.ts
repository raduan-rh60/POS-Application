import {CommonModule, DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialModule } from 'src/app/material.module';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import {OrderData} from "../order-details/order-details.component";
import {OrderService} from "../generate-sale/service/order.service";
import {ShopData} from "../../company/users/users.component";


@Component({
  selector: 'app-general-sales',
  standalone: true,
  imports: [
    MaterialModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    TableModule,
    TagModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    MultiSelectModule,
    DropdownModule,
    DatePipe,

  ],
  templateUrl: './general-sales.component.html',
  styleUrl: './general-sales.component.scss',
})
export class GeneralSalesComponent implements OnInit {
  generalSales: OrderData[]=[];

  constructor(private generalSaleService:OrderService) {}

  ngOnInit(): void {
    this.fetchAllSales()
    }

    fetchAllSales(): void {
    this.generalSaleService.findGeneralSales().subscribe((res:OrderData[])=>{
      this.generalSales=res;
      console.log(this.generalSales);
    })
    }

  subTotalPurchasePriceSum(saleItems:OrderData): number {
    // console.log(saleItems.orderItems[].subtotalPurchasePrice);
    return saleItems.orderItems.reduce((sum, item) => {
      return sum + (item.subtotalPurchasePrice || 0); // Safely add the subtotalPurchasePrice, assuming it can be null or undefined
    }, 0);
  }

  deleteInvoice(id:number){
    this.generalSaleService.deleteSale(id).subscribe(res=>{
      alert("delete Successful");
      this.fetchAllSales()
    })
  }

}
