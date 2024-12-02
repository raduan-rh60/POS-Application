import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TableModule } from 'primeng/table';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-product-damage-list',
  standalone: true,
  imports: [MatListModule, MatCardModule,MatIconModule, MaterialModule,TableModule ],
  templateUrl: './product-damage-list.component.html',
  styleUrl: './product-damage-list.component.scss'
})
export class ProductDamageListComponent {
  dataSource:any;
}
