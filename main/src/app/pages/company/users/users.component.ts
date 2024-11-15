import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
export interface User{
  id:number;
name:string;
username:string;
password:string;
role:string;
shopeReference?:string;
PhoneNumber:string;
}

const userData:User[]=[
  { id:1,
    name:'Raduan',
    username:'rd60',
    password:'1234',
    role:'Owner',
    PhoneNumber:'013456789'},
  { id:2,
    name:'Korim',
    username:'rk60',
    password:'12345',
    role:'Sales Exicutive',
    shopeReference:'Shop1',
    PhoneNumber:'0125466822'},
]
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,MatTableModule,MatIconModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  displayColumns:string[]=['id','name','role','shopeReference','details']
  userData=userData;

}
