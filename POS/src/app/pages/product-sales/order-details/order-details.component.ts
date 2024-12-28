import {Component, input, OnInit} from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {OrderService} from "../generate-sale/service/order.service";
import {DatePipe} from "@angular/common";
import {ReturnData} from "../return-form/return-form.component";
export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  returnQuantity: number;
  price: number;
  subtotal: number;
  subtotalPurchasePrice:number;
  // Add any other fields that might exist in the orderItem
}

export interface OrderData {
  customerAddress: string;
  customerName: string;
  customerPhone: string;
  discount:number;
  id: number;
  returnId: ReturnData;
  note: string;
  orderItems: OrderItem[]; // Array of OrderItem objects
  orderStatus: string;
  orderType: string;
  saleDate: Date;
  saleTime:Date; // You might want to use Date type if needed
  totalAmount: number;
  transactionType: string;
  totalPurchasePrice: number;
}

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [MaterialModule, RouterLink, DatePipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private orderService: OrderService,private router: Router) { }

  id:string | null;
  orderDetails:OrderData;

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
      })
    }

  printSection() {
    const width = 1000;
    const height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    // Get the HTML content of the print section
    const printContent = document.getElementById('print-section')?.innerHTML;

    if (printContent) {
      // Open a new print window
      const printWindow = window.open('', '', `width=${width},height=${height},left=${left},top=${top}`);

      // Write the HTML content to the new window
      printWindow!.document.write('<html><head><title>Print Order Details</title>');
      printWindow!.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">');
      printWindow!.document.write('<style>body { font-family: Arial, sans-serif; } button{display:none;}</style>');
      printWindow!.document.write('</head><body>');
      printWindow!.document.write(printContent); // Inject the content of print-section
      printWindow!.document.write('</body></html>');

      // Close the document and trigger the print dialog
      printWindow!.document.close();
      printWindow!.print();
    }
  }


  navigateToPage(data:string) {
      console.log(data);
    if(data == "ONLINE"){
      this.router.navigate(['/sales/online-sales']);
    }else {
      this.router.navigate(['/sales/general-sales']);
    }
  }
}
