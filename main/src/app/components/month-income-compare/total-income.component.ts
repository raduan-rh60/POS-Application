import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';




@Component({
  selector: 'app-total-income',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './total-income.component.html',
})
export class AppTotalIncomeComponent {

  constructor() { }

  setMonth:string="October";
  lastMontSale:number =1200; 
  saleOfPreviousMonth:number = 10000;

  progress:number = (this.lastMontSale-this.saleOfPreviousMonth)/100;
}
