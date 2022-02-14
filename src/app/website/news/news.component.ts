import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { News } from '../model/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit {

  @Input('data') data: News[] = new Array();
  baseURL: string = environment.baseURL;
  floor = Math.floor;
  offset: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.offset = (this.data.length > 2 || window.innerWidth < 1000) ? 0 : this.data.length == 2 ? 11.5 : 33;
  }

}
