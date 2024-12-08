import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CategoryService } from './service/category.service';

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
  imports: [MatCardModule, MatButtonModule, MatIconModule, DialogModule, ButtonModule,TableModule],
  templateUrl: './category-and-brands.component.html',
  styleUrl: './category-and-brands.component.scss'
})
export class CategoryAndBrandsComponent implements OnInit {
  constructor(private catService:CategoryService) {}

  ngOnInit(): void {
    this.showAllCat()
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
  brandData:any;

  // Category Service part=================================
  public showAllCat(){
    this.catService.getAllCat().subscribe((res:CategoryModel[])=>{
      this.catData=res;
      console.log(this.catData)
    })
  }
}
