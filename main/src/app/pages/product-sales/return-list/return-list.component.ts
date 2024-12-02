import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TableModule } from 'primeng/table';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-return-list',
  standalone: true,
  imports: [MatListModule, MatCardModule,MatIconModule, MaterialModule,TableModule ],
  templateUrl: './return-list.component.html',
  styleUrl: './return-list.component.scss'
})
export class ReturnListComponent {
  dataSource:any

}
