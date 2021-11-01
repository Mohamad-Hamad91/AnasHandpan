import { Component, Input, OnInit } from '@angular/core';
import { News } from '../model/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit {

  @Input('data') data: News[] = new Array();

  constructor() { }

  ngOnInit(): void {
  }

}
