import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-category-and-brands',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, DialogModule, ButtonModule,TableModule],
  templateUrl: './category-and-brands.component.html',
  styleUrl: './category-and-brands.component.scss'
})
export class CategoryAndBrandsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  catDialogue = false;

  categoryDialogue() {
    this.catDialogue = !this.catDialogue;
  }
  catData:any;



  branDialog = false;

  brandDialogue() {
    this.catDialogue = !this.catDialogue;
  }
  brandData:any;
}
