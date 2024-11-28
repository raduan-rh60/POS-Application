import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {LoginServiceService} from "../../../services/loginService/login-service.service";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatTableModule, MatIconModule,DialogModule, ButtonModule, InputTextModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  ngOnInit() {
    this.showData();
  }

  users: any[] = [];
  displayColumns: string[] = ['id', 'name','username', 'role', 'shopName', 'details']
  userData :any;
  constructor(private loginService:LoginServiceService) {
  }

  showData(){
  return this.loginService.usershowing().subscribe((res:any)=>{
    this.users=res;
    this.userData = this.users;
    console.log(this.users);
  })
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }


}
