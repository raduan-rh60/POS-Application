import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, DialogModule, ButtonModule,TableModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  allCustomer:any;
  newCustomer:any;

  catDialogue:boolean = false;
  branDialog:boolean = false;

}
