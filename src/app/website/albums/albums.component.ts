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

  constructor() { }

  ngOnInit(): void {

    const disks: HTMLCollectionOf<Element> = document.getElementsByClassName('disk');
    // debugger;
    // for (let index = 0; index < disks.length; index++) {
    //   const element:HTMLSpanElement = disks.item(index) as HTMLSpanElement;
    //   element.style.backgroundImage = this.baseURL + this.data[index].Thumbnail;
    // }
  }

  diskHover(e: MouseEvent, index: number) {
    debugger;
    const element:HTMLSpanElement = e.target as HTMLSpanElement;
    element.style.backgroundImage = this.baseURL + this.data[index].Thumbnail;
  }

}
