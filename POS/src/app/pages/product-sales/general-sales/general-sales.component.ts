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
import {TablerIconsModule} from "angular-tabler-icons";
import {Router} from "@angular/router";


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
    TablerIconsModule,

  ],
  templateUrl: './general-sales.component.html',
  styleUrl: './general-sales.component.scss',
})
export class GeneralSalesComponent implements OnInit {
  generalSales: OrderData[]=[];
  grandTotalSale:number;
  grandTotalPurchase:number;
  profit:number;

  constructor(private generalSaleService:OrderService,private router:Router,) {}

  ngOnInit(): void {
    this.fetchAllSales()
    }

    fetchAllSales(): void {
    this.generalSaleService.findGeneralSales().subscribe((res:OrderData[])=>{
      console.log(res);
      this.generalSales=res;
      console.log(this.generalSales);
      this.grandTotalSale = this.generalSales.reduce((acc, order) => acc + order.totalAmount, 0);
      this.grandTotalPurchase = this.generalSales.reduce((acc, order) => acc + order.totalPurchasePrice, 0);
      this.profit = this.grandTotalSale - this.grandTotalPurchase;
    })
    }



  deleteInvoice(id:number){
    this.generalSaleService.deleteSale(id).subscribe(res=>{
      alert("delete Successful");
      this.fetchAllSales()
    })
  }

  returnProduct(id:number){
    this.router.navigate(['sales/return-form/', id]);
  }

}
