import { Component, Input, OnInit } from '@angular/core';
import { Cover } from '../model/home';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.less']
})
export class CoverComponent implements OnInit {

  @Input('data') data: Cover = new Cover();

  constructor() { }

  ngOnInit(): void {
  }

}
