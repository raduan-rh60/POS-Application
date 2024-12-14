import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CategoryService } from './service/category.service';
import { BrandService } from './service/brand.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FloatLabelModule} from "primeng/floatlabel";

export interface CategoryModel{
  id:number;
  name:string;
  productCount:number;
}
export interface BrandModel{
  id:number;
  name:string;
  productCount:string;
}

@Component({
  selector: 'app-category-and-brands',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, DialogModule, ButtonModule, TableModule, ReactiveFormsModule, FormsModule, FloatLabelModule],
  templateUrl: './category-and-brands.component.html',
  styleUrl: './category-and-brands.component.scss'
})
export class CategoryAndBrandsComponent implements OnInit {
  constructor(private catService:CategoryService,private brandService:BrandService,private formBuilder:FormBuilder) {}

  formValueCat:FormGroup;
  formValueBrand:FormGroup;

  addSuccess:boolean = false;
  addError:boolean = false;

  ngOnInit(): void {
    this.formValueCat=this.formBuilder.group({
      name:['']
    })
    this.formValueBrand=this.formBuilder.group({
      name:['']
    })

    this.showAllCat();
    this.showAllBrand();
  }

  catDialogue = false;

  categoryDialogue() {
    this.catDialogue = !this.catDialogue;
  }
  catData:CategoryModel[]=[];



  branDialog = false;

  brandDialogue() {
    this.branDialog = !this.branDialog;
  }
  brandData:BrandModel[];

  // Category Service part=================================
  public showAllCat(){
    this.catService.getAllCat().subscribe((res:CategoryModel[])=>{
      this.catData=res;
    })
  }

  public saveCat():void{
    this.catService.createCat(this.formValueCat.value).subscribe((res)=>{
      if(res!=null){
        this.addSuccess=true;
      }else {
        this.addError=true;
      }
      this.showAllCat();
    })
  }
  public deleteCat(id:number):void{
    this.catService.delete(id).subscribe(()=>{
    alert("Category deleted successfully");
    this.showAllCat();
    })
  }


  // Brand Service part=======================================
  public showAllBrand(){
    this.brandService.getAllBrand().subscribe((res:BrandModel[])=>{
      this.brandData=res;
    })
  }

  public saveBrand():void{
    this.brandService.createBrand(this.formValueBrand.value).subscribe((res)=>{
      if(res!=null){
        this.addSuccess=true;
      }else {
        this.addError=true;
      }
      this.showAllBrand();
    })
  }
  public deleteBrand(id:number):void{
    this.brandService.delete(id).subscribe(()=>{
      alert("Brand deleted successfully");
      this.showAllBrand();
    })
  }
}
