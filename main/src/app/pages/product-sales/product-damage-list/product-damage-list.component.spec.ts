import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDamageListComponent } from './product-damage-list.component';

describe('ProductDamageListComponent', () => {
  let component: ProductDamageListComponent;
  let fixture: ComponentFixture<ProductDamageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDamageListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDamageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
