import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {FloatLabelModule} from "primeng/floatlabel";
import {PosServiceService} from "./service/pos-service.service";
import {Product} from "../../product-info/product-lists/lists.component";
import {ProductService} from "../../product-info/product-lists/service/product.service";
import {CategoryService} from "../../product-info/category-and-brands/service/category.service";
import {CategoryModel} from "../../product-info/category-and-brands/category-and-brands.component";
import {CartService} from "./service/cart.service";
import {DialogModule} from 'primeng/dialog';
import {DecimalPipe} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {OrderService} from "./service/order.service";
import {MessageService} from "primeng/api";

export interface CartModel {
  id: number;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
  cartStatus: string;
  grandTotal: number;
  productId: number;
}

export interface OrderModel {
  saleDate: Date;
  customerName: string;
  customerAddress?: string;
  customerPhone: string;
  note: string;
  totalAmount: number;
  orderType: string;
  orderStatus?: string;
  transactionType: string;
}

@Component({
  selector: 'app-generate-sale',
  standalone: true,
  imports: [MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule, FloatLabelModule, DialogModule, DecimalPipe, MatDivider
  ],
  templateUrl: './generate-sale.component.html',
  styleUrl: './generate-sale.component.scss',
  providers: [MessageService]
})
export class GenerateSaleComponent implements OnInit {
  id: number;
  name: string;
  categoryId: number;
  nullProduct: boolean = false;
  product: Product[] = [];
  category: CategoryModel[];
  productDemo: Product[];

  // Cart variables===========
  addToCart: CartModel = {
    id: 0,
    name: "",
    price: 0,
    quantity: 1,
    subtotal: 0,
    cartStatus: "PENDING",
    grandTotal: 0,
    productId: 0,

  };

  // for order popup option.
  orderOption: OrderModel = {
    saleDate: new Date(),
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    note: "",
    totalAmount: 0,
    orderType: "",
    orderStatus: "COMPLETE",
    transactionType: "",
  }

  cartList: CartModel[];

  constructor(private posService: PosServiceService,
              private categoryService: CategoryService,
              private productService: ProductService,
              private cartService: CartService,
              private orderService: OrderService,
              private messageService: MessageService,) {
  }

  ngOnInit(): void {
    this.categoryList();
    this.productList();
    this.getAllCart();
  }


  public categoryList() {
    this.categoryService.getAllCat().subscribe((res: CategoryModel[]) => {
      if (res != null) {
        this.category = res;
        this.nullProduct = false;
      }
    })
  }

  public productList() {
    this.productService.getAllProducts().subscribe((res: Product[]) => {
      if (res != null) {
        this.productDemo = res;
        this.nullProduct = false;
      }
    }, error => {
      this.nullProduct = true;
    })
  }


  public searchByID() {
    this.name = "";
    this.categoryId = 0;
    this.posService.getProductByID(this.id).subscribe((res: Product) => {

      if (res != null) {
        this.product[0] = res;
        this.nullProduct = false;
      }
    }, error => {
      this.product = [];
      this.nullProduct = true;
    })

  }


  public searchByName() {
    this.id = 0;
    this.categoryId = -1;
    this.posService.getProductByName(this.name).subscribe((res: Product[]) => {
      if (res != null) {
        this.product = res;
        this.nullProduct = false;
      }
    }, error => {
      this.product = [];
      this.nullProduct = true;
    })
  }

  public searchByCategoryId() {
    this.name = "";
    this.id = 0;
    this.posService.getProductByCategory(this.categoryId).subscribe((res: Product[]) => {
      if (res != null) {
        this.product = res;
        this.nullProduct = false;
      }
    }, error => {
      this.product = [];
      this.nullProduct = true;
    })
  }


  // Cart Section =============================================
  getAllCart() {
    this.cartService.getAllCart().subscribe((res: CartModel[]) => {
      this.cartList = res;
    })
  }


  passProduct(product: Product) {
    if (product.stock == 0) {
      alert("product not available");
    } else {


      this.addToCart.productId = product.id;
      this.addToCart.name = product.name;
      this.addToCart.price = product.price;
      this.addToCart.quantity = 1;
      this.addToCart.subtotal = product.price * this.addToCart.quantity;

      console.log(this.addToCart);
      this.cartService.addCart(this.addToCart).subscribe(res => {
        this.getAllCart();
      });

      
    }
  }

  deleteCartProduct(id: number) {

    this.cartService.deleteCartItem(id).subscribe(res => {
      alert("Product removed successfully");
      this.getAllCart();
    })
  }


  updateCart(cart: CartModel) {
    console.log(cart)
    this.cartService.editCart(cart).subscribe(res => {

    })
  }


  discount: number = 0;
  discountGrandTotal: number = 0;
  deliveryCharge: number = 0;
  finalPrice: number = 0;

  grandTotal(): number {
    this.addToCart.grandTotal = this.cartList.reduce((total, item) => total + item.subtotal, 0);
    this.discountGrandTotal = this.addToCart.grandTotal;
    this.finalPrice = this.discountGrandTotal;
    return this.addToCart.grandTotal;
  }

  subtotal(cart: CartModel) {
    cart.subtotal = cart.price * cart.quantity;
  }

  totalQuantity(): number {
    return this.cartList.reduce((total, item) => total + item.quantity, 0);
  }

  applyDiscount(): number {
    this.discountGrandTotal = this.addToCart.grandTotal * (1 - (this.discount / 100));
    return this.discountGrandTotal;
  }

  applyDelivercharge() {
    this.finalPrice = this.discountGrandTotal + this.deliveryCharge
    return this.finalPrice;
  }


  // payment Dialogue
  paymentDialogue = false;

  paymentDialogueShow() {
    this.paymentDialogue = !this.paymentDialogue;
  }

  deliveryArea: string;

  deliveryChargeFunction() {
    if (this.deliveryArea == "Dhaka") {
      this.deliveryCharge = 50;
    } else if (this.deliveryArea == "Free") {
      this.deliveryCharge = 0;
    } else {
      this.deliveryCharge = 100;
    }
  }


//   order process funstions
  paid() {
    this.orderOption.totalAmount = this.finalPrice;
  }

  order() {
    console.log(this.orderOption);
    // Step 1: Save the order
    this.orderService.saveOrder(this.orderOption).subscribe(res => {
      if (res != null) {
        // Step 2: Loop through each product in the cart and update stock
        this.cartService.getAllCart().subscribe(cartItems => {
          cartItems.forEach(item => {

            // For each item we will search each product
            this.productService.getProductById(item.productId).subscribe(product => {

              // For each cart item, calculate the new stock
              const updatedStock = product.stock - item.quantity;
              // Step 3: Update the stock for each product in the cart
              if (updatedStock >= 0) {
                this.productService.updateStock(product.id, updatedStock).subscribe(stockRes => {
                  console.log(`Updated stock for product ${product.id}: ${updatedStock}`);
                }, error => {
                  console.error(`Error updating stock for product ${product.id}`, error);
                });
              } else {
                console.error(`Not enough stock for product ${product.id}`);
                // Optionally, you could handle the error here (e.g., show a message to the user)
              }
            })

          });

          // Step 4: Update the cart status to "ORDERED"
          this.cartService.updateStatus("ORDERED").subscribe(updateRes => {
            // Step 5: Refresh the cart after status update
            this.getAllCart();
            this.paymentDialogue = false; // Close the payment dialog
          });
        });
      }
    });
  }
}
