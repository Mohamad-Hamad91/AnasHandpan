import { Component, Input, OnInit } from '@angular/core';
import { Album } from '../model/album';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.less']
})
export class AlbumsComponent implements OnInit {

  @Input('data') data: Album[] = new Array();

  constructor() { }

  ngOnInit(): void {
  }

}
