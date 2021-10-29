import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-cover-management',
  templateUrl: './cover-management.component.html',
  styleUrls: ['./cover-management.component.less']
})
export class CoverManagementComponent implements OnInit {

  data: { CoverPhoto: string };
  waiting: boolean;

  constructor(private _dataService: DataService, private _messageService: MessageService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.waiting = true;
    this._dataService
      .get()
      .subscribe(res => {
        this.data = res.Data;
        this.waiting = false;
      }, er => this.waiting = false);
  }

  update() {
    this._dataService
      .update(this.data)
      .subscribe(res => {
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Updated Successfully!' });
      }, er => this.waiting = false);
  }

}
