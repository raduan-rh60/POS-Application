import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {AvatarModule} from "primeng/avatar";
export interface companyDetails{
  companyName:string;
  companyAddress:string;
  compnayLogo:string;
}

const companyInfo:companyDetails={
  companyName:"BestBuy",
  companyAddress:"12/5/a Panthopath Dhaka",
compnayLogo:"../../../../assets/images/logos/logo.svg"}
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatTableModule, DialogModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  info:any[]=[
    {id:"DHA01",
location:"Dhaka Gabtoli",
manager:"Mohit",
managerEmail:"mohit@gmail.com",
managerPhone:"123456789"}
  ]
  displayColumns:string[]=["id",
    "shopLocation",
    "shopManager",
    "shopManagerEmail",
    "shopManagerPhone","action"]
companyData = companyInfo;
userLogo:string="../../../../assets/images/profile/user-1.jpg"

  visible:boolean=false;
  showDialog(){
    this.visible=true;
  }

  visibleShop:boolean=false;

  showShopForm(){
    this.visibleShop=true;
  }
}
