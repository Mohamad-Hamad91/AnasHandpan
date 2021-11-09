import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Events, EventsReq } from '../model/events';
import { EventsService } from '../service/events.service';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.less']
})
export class AllEventsComponent implements OnInit {

  data: Events[] = new Array();
  params: EventsReq = { PageNumber: 1, PageSize: 9 };
  waiting: boolean = true;
  baseURL: string = environment.baseURL;
  totlaCount: number = 0;

  constructor(private _dataService: EventsService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.waiting = true;
    this._dataService.getAll(this.params)
      .subscribe(res => {
        this.data.push(...res.Data.List);
        this.totlaCount = +res.Data.TotalCount;
        this.waiting = false;
      }, er => this.waiting = false);
  }

  loadMore() {
    this.params.PageNumber++;
    this.getData();
  }


}
