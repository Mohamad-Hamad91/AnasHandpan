import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOrdersManagementComponent } from './product-orders-management.component';

describe('ProductOrdersManagementComponent', () => {
  let component: ProductOrdersManagementComponent;
  let fixture: ComponentFixture<ProductOrdersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOrdersManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOrdersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
