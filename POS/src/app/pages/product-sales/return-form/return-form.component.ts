import {Component, OnInit} from '@angular/core';
import {MaterialModule} from "../../../material.module";
import {OrderData} from "../order-details/order-details.component";
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../generate-sale/service/order.service';
import {TableModule} from "primeng/table";
import {NgClass, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ReturnService} from "./serivce/return.service";

export interface ReturnItem {
  id: number;
  name: string;
  quantity: number;
  returnQuantity?:number;
  price: number;
  subtotal: number;
  subtotalPurchasePrice:number;
  // Add any other fields that might exist in the orderItem
}

export interface ReturnData {
  discount:number;
  orderID: number;
  returnItems: ReturnItem[]; // Array of OrderItem objects
  returnDate?: Date; // You might want to use Date type if needed
  returnAmount: number;
}

@Component({
  selector: 'app-return-form',
  standalone: true,
  imports: [MaterialModule, TableModule, FormsModule],
  templateUrl: './return-form.component.html',
  styleUrl: './return-form.component.scss'
})
export class ReturnFormComponent implements OnInit {

  constructor(private route: ActivatedRoute,private orderService: OrderService,private router: Router,private returnService: ReturnService) { }

  id:string | null;
  orderDetails:OrderData;
  returnItem:ReturnData={
    discount:0,
    orderID:0,
    returnItems:[],
    returnAmount:0,
  };
  returnSubtotal:number;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.showOrderDetails();

  }

  public showOrderDetails(): void {
    this.orderService.findOrderById(this.id).subscribe(result => {
      this.orderDetails=result;
      console.log(this.orderDetails);

      this.returnItem.discount=result.discount;
      this.returnItem.orderID=result.id;
      this.returnItem.returnItems=result.orderItems;
      this.returnItem.returnAmount=result.totalAmount;

      this.calculateTotalSubtotal();
      this.setReturnQuantity();

    })
  }

  calculateTotalSubtotal(): void {
    this.setReturnQuantity();
    this.returnSubtotal = this.returnItem.returnItems.reduce((acc, item) => {
    // Calculate subtotal for each item (price * quantity)
    const itemSubtotal = item.price * (item.returnQuantity ?? 1);
    return acc + itemSubtotal; // Add the itemSubtotal to the accumulator
  }, 0);
  }
  // Function to set returnQuantity equal to quantity for each ReturnItem
  setReturnQuantity(): void {
    this.returnItem.returnItems.forEach(item => {
      // If returnQuantity is not already defined, set it to quantity
      if (item.returnQuantity === undefined) {
        item.returnQuantity = item.quantity;  // Set returnQuantity to the value of quantity
      }
    });
  }


  disableInput(item: ReturnItem): void {
    // Ensure returnQuantity is never null or undefined, default to 1 if invalid
    if (item.returnQuantity == null || item.returnQuantity <= 0) {
      item.returnQuantity = 1;  // Set returnQuantity to 1 if it is invalid
    }

    // Update the subtotal for the item
    item.subtotal = item.returnQuantity * item.price;

    // Check if returnQuantity is greater than quantity
    if (item.returnQuantity > item.quantity) {
      alert(`Item: ${item.name} - returnQuantity cannot be greater than the available quantity (${item.quantity}).`);
      item.returnQuantity = item.quantity;  // Reset to available quantity
    }

    // Check if returnQuantity is less than or equal to 0
    if (item.returnQuantity <= 0) {
      alert(`Item: ${item.name} - returnQuantity cannot be less than 1.`);
      item.returnQuantity = 1;  // Set to 1 if invalid
    }

    // Update the subtotal for each item after checking conditions
    this.returnItem.returnItems.forEach((item) => {
      if(item.returnQuantity !== undefined) {
        item.subtotal = item.returnQuantity * item.price;
      }

    });

    // Calculate the total subtotal after all updates
    this.calculateTotalSubtotal();

    // Update the total return amount (subtracting the discount)
    this.returnItem.returnAmount = this.returnSubtotal - this.returnItem.discount;
  }


  removeReturnItem(itemId: number): void {
    this.returnItem.returnItems = this.returnItem.returnItems.filter(item => item.id !== itemId);
    console.log(`Item with ID ${itemId} has been removed.`);
  }

  saveReturn(): void {
    console.log(this.returnItem);
   this.returnService.saveReturn(this.returnItem).subscribe(res=>{
     console.log(res);
     this.router.navigate(['/sales/return']);
   })
  }
}
