import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {LoginServiceService} from "../../../services/loginService/login-service.service";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {TableModule} from "primeng/table";

export interface ShopData{
  id:string;
  name:string;
  username:string;
  email:string;
  shopName:string;
  role:string;
  phone:string;
}


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatTableModule, MatIconModule, MatPaginatorModule, DialogModule, ButtonModule, InputTextModule, TableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements AfterViewInit {

  constructor(private loginService:LoginServiceService) {
  }


//  User Table Data Binding Starts

  displayColumns: string[] = ['id', 'name','username', 'role', 'shopName', 'details']
  userData:ShopData[]=[];

  showData(){
  return this.loginService.usershowing().subscribe((res:ShopData[])=>{
    this.userData=res;
  })
  }
  ngAfterViewInit() {
    this.showData();
  }
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  // Employee Table Data

}
