import { Component, OnInit } from '@angular/core';
import { NewsReq } from 'src/app/admin/model/news';
import { environment } from 'src/environments/environment';
import { News } from '../model/news';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.less']
})
export class AllNewsComponent implements OnInit {

  data: News[] = new Array();
  params: NewsReq = { PageNumber: 1, PageSize: 9 };
  waiting: boolean = true;
  baseURL: string = environment.baseURL;
  totlaCount: number = 0;
  floor = Math.floor;

  constructor(private _dataService: NewsService) { }

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
