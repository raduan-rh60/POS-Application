import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { MaterialModule } from 'src/app/material.module';
import { DamageDTO, DamageService } from './service/damage-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../product-info/product-lists/service/product.service';
import { Product } from '../../product-info/product-lists/lists.component';

@Component({
  selector: 'app-product-damage-list',
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
  templateUrl: './product-damage-list.component.html',
  styleUrl: './product-damage-list.component.scss',
})
export class ProductDamageListComponent implements OnInit {
   damageDialogue: boolean = false;
   addSuccess: boolean = false;
   addError: boolean = false;
  
 
   grandTotal: number;
   monthGrandTotal: number;
    // Variables to hold damage data
  damages: DamageDTO[] = [];
  newDamage: DamageDTO = {
    id: 0,
    productId: 0,
    productName: '',
    reason: '',
    quantity: 0,
    productPrice: 0,
    damageAmount: 0,
    date: new Date()
  };

  productDemo:Product[]=[];

  // Injecting services for HTTP and Snackbar notifications
  constructor(
    private damageService: DamageService,
    private snackBar: MatSnackBar,
    private productService:ProductService
  ) {}

  // On initialization, load all damage records
  ngOnInit(): void {
    this.loadDamages();
    this.productList();
  }

  // Load the list of damage records from the backend
  loadDamages(): void {
    this.damageService.getDamageList().subscribe(
      (data) => {
        this.damages = data;
      },
      (error) => {
        this.snackBar.open('Error fetching damage records', 'Close', { duration: 3000 });
      }
    );
  }

  // Save a new or updated damage record
  saveDamage(): void {
    this.damageService.createDamage(this.newDamage).subscribe(
      (data) => {
        this.addSuccess = true;
        this.loadDamages();
        // On success, add the new damage to the list
        if (this.newDamage.id === 0) {
          this.damages.push(data);
        } else {
          const index = this.damages.findIndex(d => d.id === data.id);
          if (index !== -1) {
            this.damages[index] = data;
          }
        }
        this.snackBar.open('Damage record saved successfully', 'Close', { duration: 3000 });
        this.clearForm();
      },
      () => {
        this.snackBar.open('Error saving damage record', 'Close', { duration: 3000 });
      }
    );
  }

  // Delete a damage record
  deleteDamage(id: number): void {
    this.damageService.deleteDamage(id).subscribe(
      () => {
        // On success, remove the damage from the list
        this.damages = this.damages.filter(damage => damage.id !== id);
        this.snackBar.open('Damage record deleted successfully', 'Close', { duration: 3000 });
      },
      () => {
        this.snackBar.open('Error deleting damage record', 'Close', { duration: 3000 });
      }
    );
  }

  // Reset the form to initial values
  clearForm(): void {
    this.newDamage = {
      id: 0,
      productId: 0,
      productName: '',
      reason: '',
      quantity: 0,
      productPrice: 0,
      damageAmount: 0,
      date: new Date(),
    };
  }
   purchaseDialogueShow() {
     this.damageDialogue = !this.damageDialogue;
   }
 
   subTotalTest: number;
   
 
  public productList() {
     this.productService.getAllProducts().subscribe(
       (res: Product[]) => {
         if (res != null) {
           this.productDemo = res;
         }
       }
     );
   }
   searchByProductId(){
    this.productService.getProductById(this.newDamage.productId).subscribe(res=>{
      this.newDamage.productPrice = res.price;
    })
   }
   onchangeRate(damage:DamageDTO){
    this.newDamage.damageAmount= damage.productPrice * damage.quantity;
   }
 
}
