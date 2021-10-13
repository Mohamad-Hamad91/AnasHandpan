import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPassCodeComponent } from './forget-pass-code.component';

describe('ForgetPassCodeComponent', () => {
  let component: ForgetPassCodeComponent;
  let fixture: ComponentFixture<ForgetPassCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPassCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPassCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
