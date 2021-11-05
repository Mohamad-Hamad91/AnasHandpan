import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { Place, Product } from '../model/product';
import { TableColumn } from '../model/tableColumn';
import { DataService } from '../service/data.service';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-produc-places-management',
  templateUrl: './produc-places-management.component.html',
  styleUrls: ['./produc-places-management.component.less']
})
export class ProducPlacesManagementComponent implements OnInit {

  productId: string;
  waiting: boolean = false;
  cols: TableColumn[] = new Array();
  data: Product = new Product();
  dataTemp: Product = new Product();
  criteria: any = {};
  filtersNo: number = 0;
  submitted: boolean;
  dialog: boolean;
  item: Place;
  baseURL: string = environment.baseURL;
  editing: boolean;

  constructor(private _productService: ProductsService, private confirmationService: ConfirmationService,
    private _messageService: MessageService, private _route: Router, private _dataService: DataService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.productId = this._activatedRoute.snapshot.params.id;
      this.getData();
    });

    this.cols = [
      { header: 'Name', field: 'Name' },
      { header: 'Location', field: 'Location' },
      { header: 'Photo', field: 'Photo' },
    ];
  }

  getData() {
    this.waiting = true;
    this._productService.getOne(this.productId)
      .subscribe(res => {
        this.data = res.Data;
        this.dataTemp.Places = [...res.Data.Places];
        this.waiting = false;
      }, er => this.waiting = false);
  }

  update(): void {
    this.waiting = true;
    this._productService
      .update(this.data)
      .subscribe(res => {
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Done!' });
        this.data = res.Data;
        this.dataTemp.Places = [...this.data.Places];
        this.item = new Place();
        this.editing = false;
        this.dialog = false;
      }, er => { this.waiting = false; });
  }

  delete(record: Place): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete admin ${record.Name}?`,
      accept: () => {
        this.waiting = true;
        this.data.Places = this.data.Places.filter(place => place.Name !== record.Name);
        this.update();
      }
    });
  }


  editRow(row: Place) {
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
        this.data.Places = [...this.dataTemp.Places];
        this.filtersNo = 0;
      } else {
        for (const key in this.criteria) {
          if (Object.prototype.hasOwnProperty.call(this.criteria, key)) {
            const element = this.criteria[key];
            this.data.Places = this.dataTemp.Places?.filter(value => value[key]?.toString().toLowerCase().includes(element.toString().toLowerCase()));
          }
        }
      }
    } else {
      this.filtersNo++;
      this.data.Places = [...this.dataTemp.Places];
      for (const key in this.criteria) {
        if (Object.prototype.hasOwnProperty.call(this.criteria, key)) {
          const element = this.criteria[key];
          this.data.Places = this.data?.Places.filter(value => value[key]?.toString().toLowerCase().includes(element.toString().toLowerCase()));
        }
      } // end of for each criteria field
    }
    this.waiting = false;

  }

  clearFilter() {
    this.criteria = {};
    this.data.Places = [...this.dataTemp.Places];
    this.filtersNo = 0;
  }


  openNew() {
    this.item = new Place();
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
    if (!this.editing) this.data.Places.push(this.item);
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
        this.item.Photo = res.Data.Url;
        this.waiting = false;
        this._messageService.add({ severity: 'success', summary: 'Uploaded Successfully!' });
      }, er => this.waiting = false);
  }

}
