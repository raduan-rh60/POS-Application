import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TableModule } from 'primeng/table';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-purchase-list',
  standalone: true,
  imports: [MatListModule, MatCardModule,MatIconModule, MaterialModule,TableModule ],
  templateUrl: './purchase-list.component.html',
  styleUrl: './purchase-list.component.scss'
})
export class PurchaseListComponent {
  dataSource:any;

}
