import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { Album, Song } from '../model/albums';
import { TableColumn } from '../model/tableColumn';
import { AlbumService } from '../service/album.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-song-management',
  templateUrl: './song-management.component.html',
  styleUrls: ['./song-management.component.less']
})
export class SongManagementComponent implements OnInit {

  data: Album = new Album();
  dataTemp: Album = new Album();
  waiting: boolean = true;
  albumId: string;
  cols: TableColumn[] = new Array();
  filtersNo: number = 0;
  criteria: any = {};
  submitted: boolean;
  dialog: boolean;
  item: Song;
  baseURL: string = environment.baseURL;
  editing: boolean;

  constructor(private _albumService: AlbumService, private _messageService: MessageService,
    private _route: Router, private _dataService: DataService, private _activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.albumId = this._activatedRoute.snapshot.params.id;
    });

    this.cols = [
      { header: 'Order', field: 'SortOrder' },
      { header: 'Name', field: 'Name' }
    ];

    this.getData();
  }

  getData() {
    this.waiting = true;
    this._albumService.getOne(this.albumId)
      .subscribe(res => {
        this.data = res.Data;
        this.dataTemp.Songs = [...this.data.Songs];
        this.waiting = false;
      }, er => this.waiting = false);
  }

  update(): void {
    this.waiting = true;
    this._albumService
      .update(this.data)
      .subscribe(res => {
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Done!' });
        this.data = res.Data;
        this.dataTemp.Songs = [...this.data.Songs];
        this.item = new Song();
        this.editing = false;
        this.dialog = false;
      }, er => { this.waiting = false; });
  }

  delete(record: Song): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete admin ${record.Name}?`,
      accept: () => {
        this.waiting = true;
        this.data.Songs = this.data.Songs.filter(song => song.Name !== record.Name);
        this.update();
      }
    });
  }


  editRow(row: Song) {
    this.editing = true;
    this.submitted = false;
    this.item = row;
    this.dialog = true;
  }


  filterChange(query, colName) {
    this.waiting = true;
    if (!query || !query?.toString()?.trim()) {
      this.filtersNo--;
      delete this.criteria[colName];
      if (Object.keys(this.criteria).length < 1) {
        this.data.Songs = [...this.dataTemp.Songs];
        this.filtersNo = 0;
      } else {
        for (const key in this.criteria) {
          if (Object.prototype.hasOwnProperty.call(this.criteria, key)) {
            const element = this.criteria[key];
            this.data.Songs = this.dataTemp.Songs?.filter(value => value[key]?.toString().toLowerCase().includes(element.toString().toLowerCase()));
          }
        }
      }
    } else {
      this.filtersNo++;
      this.data.Songs = [...this.dataTemp.Songs];
      for (const key in this.criteria) {
        if (Object.prototype.hasOwnProperty.call(this.criteria, key)) {
          const element = this.criteria[key];
          this.data.Songs = this.data?.Songs.filter(value => value[key]?.toString().toLowerCase().includes(element.toString().toLowerCase()));
        }
      } // end of for each criteria field
    }
    this.waiting = false;

  }

  clearFilter() {
    this.criteria = {};
    this.data.Songs = [...this.dataTemp.Songs];
    this.filtersNo = 0;
  }


  openNew() {
    this.item = new Song();
    this.submitted = false;
    this.dialog = true;
  }

  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  save() {
    this.submitted = true;
    this.waiting = true;
    const temp: any = { ...this.item };
    temp.SortOrder = temp.SortOrder.toString();
    if (!this.editing) this.data.Songs.push(temp);
    this.update();
  }

  onUpload(event) {
    this.waiting = true;
    const file = event.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file);
    this._dataService
      .upload(formData)
      .subscribe(res => {
        this.item.Url = res.Data.Url;
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Uploaded Successfully!' });
      }, er => this.waiting = false);
  }

}
