import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Album } from '../model/album';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.less']
})
export class AlbumsComponent implements OnInit {

  @Input('data') data: Album[] = new Array();
  baseURL = environment.baseURL;

  constructor() { }

  ngOnInit(): void {
  }

}
