import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { TableModule } from 'primeng/table';


export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-product-lists',
  standalone: true,
  imports: [MatListModule, MatCardModule, DatePipe,MatIconModule, MaterialModule,TableModule ],
  templateUrl: './lists.component.html',
})
export class AppProductListsComponent {
  constructor() {}
  dataSource:any;
}
