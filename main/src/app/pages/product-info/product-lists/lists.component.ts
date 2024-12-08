import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MaterialModule } from 'src/app/material.module';
import { TableModule } from 'primeng/table';
import {DialogModule} from "primeng/dialog";


export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-product-lists',
  standalone: true,
  imports: [MatListModule, MatCardModule, MatIconModule, MaterialModule, TableModule, DialogModule],
  templateUrl: './lists.component.html',
})
export class AppProductListsComponent {
  constructor() {}
  dataSource:any;

  productDialog:boolean=false;
  productDialogOpen(){
    this.productDialog=!this.productDialog;
  }
  addSuccess:boolean=false
  addError:boolean=false;
}
