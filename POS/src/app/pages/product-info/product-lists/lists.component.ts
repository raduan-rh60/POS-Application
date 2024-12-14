import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/material.module';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ProductService } from './service/product.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandService } from '../category-and-brands/service/brand.service';
import { CategoryService } from '../category-and-brands/service/category.service';
import {
  BrandModel,
  CategoryModel,
} from '../category-and-brands/category-and-brands.component';

export interface Product {
  id: number;
  name: string;
  stock: number;
  purchasePrice: number;
  price: number;
  category: number;
  brand: number;
  image?:string;
}


@Component({
  selector: 'app-product-lists',
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
  ],
  templateUrl: './lists.component.html',
})
export class AppProductListsComponent implements OnInit {
  showingProduct:Product[]=[];
  product: Product= {
    id:0,
    name: '',
    stock: 0,
    purchasePrice: 0,
    price: 0,
    image: '',
    category: 0,
    brand: 0
  };

  categories: CategoryModel[] = [];
  brands: BrandModel[] = [];

  constructor(
    private catService: CategoryService,
    private brandService: BrandService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.showAllCat();
    this.showAllBrand();
    this.showAllProduct();
  }

  public showAllCat() {
    this.catService.getAllCat().subscribe((res: CategoryModel[]) => {
      this.categories = res;
    });
  }
  public showAllBrand() {
    this.brandService.getAllBrand().subscribe((res: BrandModel[]) => {
      this.brands = res;
    });
  }

  // base64StringImg: string | null = null;

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      // When the file is read as a data URL, store the Base64 string
      reader.onload = () => {
        // The `result` contains the Base64 string with a prefix (e.g., "data:image/png;base64,")
        this.product.image = reader.result as string;
      };

      // Handle errors
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };

      // Read the file as a Base64-encoded data URL
      reader.readAsDataURL(file);
    }
  }

  // Saving product method===================================
  addSuccess: boolean = false;
  addError: boolean = false;
  public saveProduct(){
 return this.productService.saveProduct(this.product).subscribe(res=>{
  if(res!=null){
    this.addSuccess=true;
    this.product={
      id:0,
      name: '',
      stock: 0,
      purchasePrice: 0,
      price: 0,
      image: '',
      category: 0,
      brand:  0
      }
  }else{
    this.addError=false;
  }
  this.showAllProduct();
 });
  }


  // showing All Products ==============================
  public showAllProduct(){
    this.productService.getAllProducts().subscribe((res:Product[])=>{
      this.showingProduct=res;
    })
  }


  // deletingProduct======================
  public delete(id:number){
    this.productService.deleteProduct(id).subscribe(res=>{
      if(res!=null){
        alert("product Deleted Succcessfully");
        this.showAllProduct();
      }
    })
  }


  productDialog: boolean = false;
  productDialogOpen() {
    if(this.editButtonShow){
      this.editButtonShow=false;
    }
    this.productDialog = !this.productDialog;
  }

  editButtonShow:boolean=false;
  // EditProduct==========================
  public showEditDialogue(row:Product){
    console.log(row);
    this.productDialog = !this.productDialog;
      this.product.id=row.id;
      this.product.name= row.name;
      this.product.stock= row.stock;
      this.product.purchasePrice= row.purchasePrice;
      this.product.price= row.price;
      this.product.category= row.category;
      this.product.brand= row.brand
      this.editButtonShow = true;

  }

  public updateProduct(){
    console.log(this.product)
    this.productService.updateService(this.product).subscribe(res=>{
      if(res!=null){
        alert("Product Updated Successful");
        this.showAllProduct();
      }
    })
  }

}
