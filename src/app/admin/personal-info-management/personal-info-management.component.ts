import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-personal-info-management',
  templateUrl: './personal-info-management.component.html',
  styleUrls: ['./personal-info-management.component.less']
})
export class PersonalInfoManagementComponent implements OnInit {

  data: { PersonalInfo: string };
  waiting: boolean;

  constructor(private _dataService: DataService, private _messageService: MessageService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.waiting = true;
    this._dataService
      .getPersonal()
      .subscribe(res => {
        this.data = res.Data;
        this.waiting = false;
      }, er => this.waiting = false);
  }

  update() {
    this._dataService
      .updatePersonal(this.data)
      .subscribe(res => {
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Updated Successfully!' });
      }, er => this.waiting = false);
  }


}
