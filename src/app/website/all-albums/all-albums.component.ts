import { Component, OnInit } from '@angular/core';
import { AlbumReq } from 'src/app/admin/model/albums';
import { environment } from 'src/environments/environment';
import { Album } from '../model/album';
import { AlbumService } from '../service/album.service';

@Component({
  selector: 'app-all-albums',
  templateUrl: './all-albums.component.html',
  styleUrls: ['./all-albums.component.less']
})
export class AllAlbumsComponent implements OnInit {

  data: Album[] = new Array();
  params: AlbumReq = { PageNumber: 1, PageSize: 9 };
  waiting: boolean = true;
  baseURL: string = environment.baseURL;
  totlaCount: number = 0;
  offset: number = 0;

  constructor(private _dataService: AlbumService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.waiting = true;
    this._dataService.getAll(this.params)
      .subscribe(res => {
        this.data.push(...res.Data.List);
        this.offset = (this.data.length > 2 || window.innerWidth < 1000) ? 0 : this.data.length == 2 ? 11.5 : 33;
        this.totlaCount = +res.Data.TotalCount;
        this.waiting = false;
      }, er => this.waiting = false);
  }

  loadMore() {
    this.params.PageNumber++;
    this.getData();
  }


}
