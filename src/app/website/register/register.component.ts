import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegisterReq } from '../model/login';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  data: RegisterReq = new RegisterReq();
  @ViewChild('Email') Email!: HTMLFormElement;
  @ViewChild('Name') Name!: HTMLFormElement;
  @ViewChild('Phone') Phone!: HTMLFormElement;
  @ViewChild('Password') Password!: HTMLFormElement;
  @ViewChild('ConfirmPassowrd') ConfirmPassowrd!: HTMLFormElement;
  constructor(private _router: Router, private _authService: AuthService, private _messageService: MessageService) { }

  ngOnInit(): void {
  }

  register() {
    if (this.validate())
      this._authService.register(this.data)
        .subscribe(res => {
          localStorage.setItem('email', this.data.Email);
          this._router.navigate(['/verify']);
        }, er => { });
  }

  validate(): boolean {
    if (this.Email?.errors?.required) {
      this._messageService.add({ severity: 'error', summary: 'Email is required' });
      return false;
    }
    if (this.Name?.errors?.required) {
      this._messageService.add({ severity: 'error', summary: 'Phone is required' });
      return false;
    }
    if (this.Phone?.errors?.required) {
      this._messageService.add({ severity: 'error', summary: 'Phone is required' });
      return false;
    }
    if (this.Password?.errors?.required) {
      this._messageService.add({ severity: 'error', summary: 'Password is required' });
      return false;
    }
    if (this.ConfirmPassowrd?.errors?.required) {
      this._messageService.add({ severity: 'error', summary: 'Confirm Passowrd is required' });
      return false;
    }
    if(this.data.Password !== this.data.ConfirmPassowrd) {
      this._messageService.add({ severity: 'error', summary: 'Confirm Passowrd Must match password!' });
      return false;
    }
    return true;
  }

}
