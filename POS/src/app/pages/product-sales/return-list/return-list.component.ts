import {Component, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TableModule } from 'primeng/table';
import { MaterialModule } from 'src/app/material.module';
import {Router} from "@angular/router";
import {ReturnService} from "../return-form/serivce/return.service";

@Component({
  selector: 'app-return-list',
  standalone: true,
  imports: [MaterialModule,TableModule ],
  templateUrl: './return-list.component.html',
  styleUrl: './return-list.component.scss'
})
export class ReturnListComponent implements OnInit{
  grandTotalProducts:number=0;
  grandTotalReturn:number=0;
  constructor(private router:Router,private returnService: ReturnService) {
  }

  ngOnInit(): void {
this.getAllReturns()
  }

  dataSource:any

  public getAllReturns(){
     this.returnService.getReturn().subscribe(res=>{
       this.dataSource=res;
       console.log(res);
       this.grandTotalReturn = this.dataSource.reduce((sum:number, item:any) => sum + item.returnAmount, 0);
       this.grandTotalProducts = this.dataSource.reduce((totalSum:number, saleRecord:any) => {
         const orderItems = saleRecord.orderId.orderItems;
         const returnQuantitySum = orderItems.reduce((sum:number, item:any) => sum + item.returnQuantity, 0);
         return totalSum + returnQuantitySum;
       }, 0);
     })
  }

navigateToInvoice(id:string){
  this.router.navigate(['sales/order-details/', id]);
}
}
