import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducPlacesManagementComponent } from './produc-places-management.component';

describe('ProducPlacesManagementComponent', () => {
  let component: ProducPlacesManagementComponent;
  let fixture: ComponentFixture<ProducPlacesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducPlacesManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducPlacesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
