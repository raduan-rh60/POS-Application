import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {FloatLabelModule} from 'primeng/floatlabel';
import {PosServiceService} from './service/pos-service.service';
import {Product} from '../../product-info/product-lists/lists.component';
import {ProductService} from '../../product-info/product-lists/service/product.service';
import {CategoryService} from '../../product-info/category-and-brands/service/category.service';
import {CategoryModel} from '../../product-info/category-and-brands/category-and-brands.component';
import {CartService} from './service/cart.service';
import {DialogModule} from 'primeng/dialog';
import {DecimalPipe} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {OrderService} from './service/order.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

export interface CartModel {
  id: number;
  name: string;
  quantity: number;
  price: number;
  purchasePrice: number;
  subtotal: number;
  cartStatus: string;
  grandTotal: number;
  productId: number;
  subTotalPurchasePrice: number;
  grandTotalPurchasePrice: number;
}

export interface OrderModel {
  id?: number;
  saleDate?:Date;
  saleTime?:Date;
  customerName: string;
  customerAddress?: string;
  customerPhone: string;
  note: string;
  totalAmount: number;
  discount:number;
  orderType: string;
  orderStatus?: string;
  transactionType: string;
  totalPurchasePrice: number;
}

@Component({
  selector: 'app-generate-sale',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    FloatLabelModule,
    DialogModule,
    DecimalPipe,
    MatDivider,
  ],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.scss',
  providers: [MessageService],
})
export class PosComponent implements OnInit {
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
    name: '',
    price: 0,
    purchasePrice: 0,
    quantity: 1,
    subtotal: 0,
    cartStatus: 'PENDING',
    grandTotal: 0,
    productId: 0,
    subTotalPurchasePrice: 0,
    grandTotalPurchasePrice: 0,
  };

  // for order popup option.
  orderOption: OrderModel = {
    customerName: '',
    customerAddress: '',
    customerPhone: '',
    note: '',
    discount:0,
    totalAmount: 0,
    orderType: '',
    orderStatus: 'COMPLETE',
    transactionType: '',
    totalPurchasePrice: 0,
  };

  cartList: CartModel[];

  constructor(
    private posService: PosServiceService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
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
    });
  }

  public productList() {
    this.productService.getAllProducts().subscribe(
      (res: Product[]) => {
        if (res != null) {
          this.productDemo = res;
          this.nullProduct = false;
        }
      },
      (error) => {
        this.nullProduct = true;
      }
    );
  }

  public searchByID() {
    this.name = '';
    this.categoryId = 0;
    this.posService.getProductByID(this.id).subscribe(
      (res: Product) => {
        if (res != null) {
          this.product[0] = res;
          this.nullProduct = false;
        }
      },
      (error) => {
        this.product = [];
        this.nullProduct = true;
      }
    );
  }

  public searchByName() {
    this.id = 0;
    this.categoryId = -1;
    this.posService.getProductByName(this.name).subscribe(
      (res: Product[]) => {
        if (res != null) {
          this.product = res;
          this.nullProduct = false;
        }
      },
      (error) => {
        this.product = [];
        this.nullProduct = true;
      }
    );
  }

  public searchByCategoryId() {
    this.name = '';
    this.id = 0;
    this.posService.getProductByCategory(this.categoryId).subscribe(
      (res: Product[]) => {
        if (res != null) {
          this.product = res;
          this.nullProduct = false;
        }
      },
      (error) => {
        this.product = [];
        this.nullProduct = true;
      }
    );
  }

  // Cart Section =============================================
  getAllCart() {
    this.cartService.getAllCart().subscribe((res: CartModel[]) => {
      this.cartList = res;
    });
  }


  passProduct(product: Product) {
    if (product.stock == 0) {
      alert('product not available');
    } else {
      this.cartService.newAddToCart(product.id).subscribe((res) => {
        this.addToCart = res;
        this.getAllCart();
      });
    }
  }

  deleteCartProduct(id: number) {
    this.cartService.deleteCartItem(id).subscribe((res) => {
      alert('Product removed successfully');
      this.getAllCart();
    });
  }

  updateCart(cart: CartModel) {
    console.log(cart);
    this.cartService.editCart(cart).subscribe((res) => {
    });
  }


  discountGrandTotal: number = 0;
  deliveryCharge: number = 0;
  finalPrice: number = 0;

  grandTotal(): number {
    this.addToCart.grandTotalPurchasePrice = this.cartList.reduce(
      (total, item) => total + item.subTotalPurchasePrice,
      0
    );
    this.addToCart.grandTotal = this.cartList.reduce(
      (total, item) => total + item.subtotal,
      0
    );
    this.discountGrandTotal = this.addToCart.grandTotal;
    this.finalPrice = this.discountGrandTotal;
    return this.addToCart.grandTotal;
  }

  subtotal(cart: CartModel) {
    cart.subtotal = cart.price * cart.quantity;
    cart.subTotalPurchasePrice = cart.purchasePrice * cart.quantity;
    console.log(cart);
  }

  totalQuantity(): number {
    return this.cartList.reduce((total, item) => total + item.quantity, 0);
  }

  applyDiscount(): number {
    this.discountGrandTotal =
      this.addToCart.grandTotal * (1 - this.orderOption.discount / 100);
    return this.discountGrandTotal;
  }

  applyDelivercharge() {
    this.finalPrice = this.discountGrandTotal + this.deliveryCharge;
    return this.finalPrice;
  }

  // payment Dialogue
  paymentDialogue = false;

  paymentDialogueShow() {
    this.paymentDialogue = !this.paymentDialogue;
  }

  deliveryArea: string;

  deliveryChargeFunction() {
    if (this.deliveryArea == 'Dhaka') {
      this.deliveryCharge = 50;
    } else if (this.deliveryArea == 'Free') {
      this.deliveryCharge = 0;
    } else {
      this.deliveryCharge = 100;
    }
  }

  //   order process funstions
  paid() {
    this.orderOption.totalPurchasePrice =
      this.addToCart.grandTotalPurchasePrice;
    this.orderOption.totalAmount = this.finalPrice;
  }

  

  order(): void {
    console.log(this.orderOption);
    if (this.cartList.length === 0) {
      alert('Cart is empty!');
      return;
    }

    this.orderService.saveOrder(this.orderOption).subscribe(
      (res) => {
        // Update the cart status to "ORDERED"
        this.cartService.updateStatus('ORDERED').subscribe((updateRes) => {
          // Refresh the cart after status update
          this.getAllCart();

        });
        this.orderOption = res;
        console.log(this.orderOption);
        this.router.navigate(['sales/order-details/', this.orderOption.id]);
      }
    );
  }
}