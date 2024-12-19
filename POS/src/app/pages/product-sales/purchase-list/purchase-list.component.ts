import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TableModule } from 'primeng/table';
import { MaterialModule } from 'src/app/material.module';
import { Purchase, PurchaseService } from './service/purchase.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-purchase-list',
  standalone: true,
  imports: [
    MatListModule,
    MatCardModule,
    MatIconModule,
    MaterialModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: './purchase-list.component.html',
  styleUrl: './purchase-list.component.scss',
})
export class PurchaseListComponent {
  purchases: Purchase[] = [];
  selectedPurchase: Purchase | null = null;
  purchaseDialogue: boolean = false;
  addSuccess: boolean = false;
  addError: boolean = false;
  purchase: Purchase = {
    id: 0,
    name: '',
    quantity: 0,
    rate: 0,
    sub_total: 0,
    date: new Date(),
  };

  grandTotal: number;
  monthGrandTotal: number;
  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    // Fetch all purchases on component initialization
    this.loadPurchases();
  }

  // Load all purchases from the API
  loadPurchases(): void {
    this.purchaseService.getAllPurchases().subscribe((data) => {
      this.purchases = data;

      this.purchases.forEach((purchase) => {
        if (purchase.quantity && purchase.rate) {
          purchase.sub_total = purchase.quantity * purchase.rate; // Recalculate sub_total
        } else {
          purchase.sub_total = 0; // Set default if missing
        }
      });
  
      // Calculate the grand total
      this.grandTotal = this.purchases.reduce(
        (acc, purchase) => acc + (purchase.sub_total || 0),
        0
      );
  
      // Calculate the month grand total for current month
      const currentMonth = new Date().getMonth();
      this.monthGrandTotal = this.purchases
        .filter((purchase) => new Date(purchase.date).getMonth() === currentMonth)
        .reduce((acc, purchase) => acc + (purchase.sub_total || 0), 0);
    }
    );
  }
  

  // Fetch a specific purchase by ID
  getPurchase(id: number): void {
    this.purchaseService.getPurchaseById(id).subscribe((data) => {
      this.selectedPurchase = data;
    });
  }

  // Create or update a purchase
  savePurchase(): void {
    if (this.purchase.id) {
      // Update purchase
      this.purchaseService
        .updatePurchase(this.purchase.id, this.purchase)
        .subscribe((res) => {
          this.loadPurchases();
          if (res != null) {
            this.addSuccess = true;
          } else {
            this.addError = true;
          }
        });
    } else {
      // Create new purchase
      this.purchaseService.savePurchase(this.purchase).subscribe(() => {
        this.loadPurchases(); // Reload the list after create
      });
    }
  }

  // Delete a purchase
  deletePurchase(id: number): void {
    this.purchaseService.deletePurchase(id).subscribe(() => {
      this.loadPurchases(); // Reload the list after deletion
    });
  }

  purchaseDialogueShow() {
    this.purchaseDialogue = !this.purchaseDialogue;
  }

  subTotalTest: number;
  onchangeRate(purchase: Purchase) {
    this.subTotalTest =
      purchase.quantity && purchase.rate
        ? purchase.quantity * purchase.rate
        : 0;
  }




    
}
