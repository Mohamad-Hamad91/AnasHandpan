import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusManagementComponent } from './order-status-management.component';

describe('OrderStatusManagementComponent', () => {
  let component: OrderStatusManagementComponent;
  let fixture: ComponentFixture<OrderStatusManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderStatusManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
