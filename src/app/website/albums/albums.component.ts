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
  floor = Math.floor;
  albumOffset: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.albumOffset = (this.data.length > 2 || window.innerWidth < 1000) ? 0 : this.data.length == 2 ? 11.5 : 33;
  }

  diskHover(e: MouseEvent, index: number) {
    debugger;
    const element:HTMLSpanElement = e.target as HTMLSpanElement;
    element.style.backgroundImage = this.baseURL + this.data[index].Thumbnail;
  }

}
