import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-new-customers',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './new-customers.component.html',
})
export class AppNewCustomersComponent {
  constructor() {}
  setMonth: string = 'november';
  sellTarget: number = 125000;
  currectSale:number = 120000;

  progress:number = (this.currectSale*100)/this.sellTarget;
}
