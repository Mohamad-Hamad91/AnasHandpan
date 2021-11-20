import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Profile } from '../model/profile';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  data: Profile = new Profile();
  waiting = true;

  constructor(private _dataService: ProfileService, private _messageService: MessageService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.waiting = true;
    this._dataService
      .get().subscribe(res => {
        this.data = res.Data;
        this.waiting = false;
      }, er => this.waiting = false);
  }

  update() {
    this.waiting = true;
    this._dataService.update(this.data)
      .subscribe(res => {
        this.data = res.Data;
        this.waiting = false;
        this._messageService.add({
          severity: 'success',
          summary: 'Done!',
          life: 10000,
          detail: 'Information updated!',
        });
      }, er => this.waiting = false);
  }

}
