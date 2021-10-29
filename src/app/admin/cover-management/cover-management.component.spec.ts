import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverManagementComponent } from './cover-management.component';

describe('CoverComponent', () => {
  let component: CoverManagementComponent;
  let fixture: ComponentFixture<CoverManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
