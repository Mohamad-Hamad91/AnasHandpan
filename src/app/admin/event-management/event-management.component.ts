import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { EventReq, Events } from '../model/event';
import { TableColumn } from '../model/tableColumn';
import { DataService } from '../service/data.service';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.less']
})
export class EventManagementComponent implements OnInit {

  waiting: boolean = false;
  cols: TableColumn[] = new Array();
  params: EventReq = { PageNumber: 1, PageSize: 10 };
  totalRecords: number = 0;
  data: Events[] = new Array();
  dataTemp: Events[] = new Array();
  originalVal: any;
  criteria: any = {};
  filtersNo: number = 0;
  submitted: boolean;
  dialog: boolean;
  item: Events;
  videosDialog: boolean;
  photosDialog: boolean;
  baseURL: string = environment.baseURL;

  constructor(private _eventsService: EventService, private confirmationService: ConfirmationService,
    private _messageService: MessageService, private _route: Router, private _dataService: DataService) { }

  ngOnInit(): void {

    this.cols = [
      {
        header: 'Title',
        field: 'Title',
      },
      {
        header: 'Photo',
        field: 'Photo',
      },
      {
        header: 'Venue',
        field: 'Venue',
      },
      {
        header: 'Location',
        field: 'Location',
      },
      // {
      //   header: 'Description',
      //   field: 'Description',
      // },
      {
        header: 'Date',
        field: 'Date',
      }
    ];

    this.getData();

  }

  getData(): void {
    this.waiting = true;
    this._eventsService
      .get(this.params)
      .subscribe(res => {
        this.data = res.Data.List;
        this.totalRecords = +res?.Data?.TotalCount;
        this.data.forEach(rec => rec.Date = new Date(rec.Date));
        this.waiting = false;
        this.dataTemp = [...this.data];
      }, er => { this.waiting = false; });
  }

  update(record: Events): void {
    this.waiting = true;
    this._eventsService
      .update(record)
      .subscribe(res => {
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Updated Successfully!' });
        record.isEditable = false;
        let i = this.data.findIndex(row => row.Id == this.item.Id);
        this.data[i] = res.Data;
        this.data = [...this.data];
        this.item = new Events();
        this.dialog = false;
        this.photosDialog = false;
        this.videosDialog = false;
      }, er => { this.waiting = false; });
  }

  delete(record: Events): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete admin ${record.Title}?`,
      accept: () => {
        this.waiting = true;
        this._eventsService
          .delete(record.Id)
          .subscribe(res => {
            this.data = this.data.filter(row => row.Id !== record.Id);
            this.waiting = false;
            this._messageService.add({ severity: 'success', summary: 'Deleted Successfully!' });
          }, er => { this.waiting = false; });
      }
    });
  }


  editRow(row: Events) {
    this.submitted = false;
    this.waiting = true;
    this.item = row;
    this._eventsService.getOne(row.Id)
      .subscribe(res => {
        this.item = res.Data;
        this.waiting = false;
        this.dialog = true;
      }, er => this.waiting = false);
  }

  cancel(row: Events) {
    row = { ...this.originalVal };
    this.data.filter(row => row.isEditable).map(r => { r.isEditable = false; return r });
  }

  filterChange(query, colName) {
    this.waiting = true;
    // debugger;
    if (!query || !query?.toString()?.trim()) {
      this.filtersNo--;
      delete this.criteria[colName];
      if (Object.keys(this.criteria).length < 1) {
        this.data = [...this.dataTemp];
        this.filtersNo = 0;
      } else {
        for (const key in this.criteria) {
          if (Object.prototype.hasOwnProperty.call(this.criteria, key)) {
            const element = this.criteria[key];
            this.data = this.dataTemp.filter(value => value[key]?.toString().toLowerCase().includes(element.toString().toLowerCase()));
          }
        }
      }
    } else {
      this.filtersNo++;
      this.data = [...this.dataTemp];
      for (const key in this.criteria) {
        if (Object.prototype.hasOwnProperty.call(this.criteria, key)) {
          const element = this.criteria[key];
          this.data = this.data.filter(value => value[key]?.toString().toLowerCase().includes(element.toString().toLowerCase()));
        }
      } // end of for each criteria field
    }
    this.waiting = false;

  }

  clearFilter() {
    this.criteria = {};
    this.data = [...this.dataTemp];
    this.filtersNo = 0;
  }

  paginate(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    this.params.PageSize = event.rows;
    this.params.PageNumber = event.page + 1;
    // debugger;
    this.getData();
  }

  openNew() {
    this.item = new Events();
    this.submitted = false;
    this.dialog = true;
  }

  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  hidePhotosDialog() {
    this.photosDialog = false;
    this.submitted = false;
  }

  hideVideosDialog() {
    this.videosDialog = false;
    this.submitted = false;
  }

  save() {
    this.submitted = true;
    this.waiting = true;
    if (this.item.Id) {
      this.update(this.item);
    } else {
      this._eventsService
        .add(this.item)
        .subscribe(res => {
          this.item.Id = res.Data.Id;
          this.data.push(this.item);
          this.dataTemp.push(this.item);
          this.waiting = false;
          this.dialog = false;
          this.item = new Events();
          this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Created Successfully', life: 3000 });
        }, er => {
          this.waiting = false;
        });
    }
  }

  onUpload(event) {
    this.waiting = true;
    const file = event.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file);
    this._dataService.upload(formData)
      .subscribe(res => {
        this.item.Photo = res.Data.Url;
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Uploaded Successfully!' });
      }, er => this.waiting = false);
  }

  onUploadPhoto(event) {
    this.waiting = true;
    const file = event.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file);
    this._dataService.upload(formData)
      .subscribe(res => {
        this.item.Photos.push(res.Data.Url);
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Uploaded Successfully!' });
      }, er => this.waiting = false);
  }

  onUploadVideo(event) {
    this.waiting = true;
    const file = event.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file);
    this._dataService.upload(formData)
      .subscribe(res => {
        this.item.Videos.push(res.Data.Url);
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Uploaded Successfully!' });
      }, er => this.waiting = false);
  }

  managePhotos(row: Events) {
    this.submitted = false;
    this.waiting = true;
    this._eventsService.getOne(row.Id)
      .subscribe(res => {
        this.item = res.Data;
        this.photosDialog = true;
        this.waiting = false;
      }, er => this.waiting = false);
  }

  deletePhoto(index: number) {
    this.item.Photos = [...this.item.Photos.filter((rec, i) => i != index)];
  }

  deleteVideo(index: number) {
    this.item.Videos = [...this.item.Videos.filter((rec, i) => i != index)];
  }

  manageVideos(row: Events) {
    this.submitted = false;
    this.waiting = true;
    this._eventsService.getOne(row.Id)
      .subscribe(res => {
        this.item = res.Data;
        this.videosDialog = true;
        this.waiting = false;
      }, er => this.waiting = false);
  }

}
