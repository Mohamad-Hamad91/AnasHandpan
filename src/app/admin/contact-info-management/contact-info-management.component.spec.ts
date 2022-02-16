import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoManagementComponent } from './contact-info-management.component';

describe('ContactInfoManagementComponent', () => {
  let component: ContactInfoManagementComponent;
  let fixture: ComponentFixture<ContactInfoManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactInfoManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
