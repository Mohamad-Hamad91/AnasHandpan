import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoManagementComponent } from './personal-info-management.component';

describe('PersonalInfoManagementComponent', () => {
  let component: PersonalInfoManagementComponent;
  let fixture: ComponentFixture<PersonalInfoManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInfoManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInfoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
