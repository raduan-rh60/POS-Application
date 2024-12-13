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

export interface CartModel {
  id: number;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
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
    MatCheckboxModule, FloatLabelModule,
  ],
  templateUrl: './generate-sale.component.html',
  styleUrl: './generate-sale.component.scss'
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
    quantity: 0,
    subtotal: 0,
  };
  cartList: CartModel[];

  constructor(private posService: PosServiceService, private categoryService: CategoryService, private productService: ProductService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.categoryList();
    this.productList();
    this.getaLlCart();
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
  getaLlCart() {
    this.cartService.getAllCart().subscribe((res: CartModel[]) => {
      this.cartList = res;
    })
  }


  passProduct(product: Product) {
    if (product.stock == 0) {
      alert("product not available");
    } else {

      this.addToCart.name = product.name;
      this.addToCart.price = product.price;
      this.addToCart.quantity = 1;
      this.addToCart.subtotal = product.price * this.addToCart.quantity;

      this.cartService.addCart(this.addToCart).subscribe(res => {
        this.getaLlCart();
      });
    }
  }

  deleteCartProduct(id: number) {
    this.cartService.deleteCartItem(id).subscribe(res => {
      alert("Product removed successfully");
      this.getaLlCart();
    })
  }

  grandTotal(): number {
    return this.cartList.reduce((total, item) => total + item.subtotal, 0);
  }
}
