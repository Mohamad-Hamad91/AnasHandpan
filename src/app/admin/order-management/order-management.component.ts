import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { Orders, OrdersReq, StatusHistory } from '../model/orders';
import { TableColumn } from '../model/tableColumn';
import { DataService } from '../service/data.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.less']
})
export class OrderManagementComponent implements OnInit {

  waiting: boolean = false;
  cols: TableColumn[] = new Array();
  params: OrdersReq = { PageNumber: 1, PageSize: 10 };
  totalRecords: number = 0;
  data: Orders[] = new Array();
  dataTemp: Orders[] = new Array();
  originalVal: any;
  criteria: any = {};
  filtersNo: number = 0;
  submitted: boolean;
  dialog: boolean;
  item: Orders;
  baseURL: string = environment.baseURL;
  photosDialog: boolean;
  videosDialog: boolean;

  constructor(private _orderService: OrderService, private confirmationService: ConfirmationService,
    private _messageService: MessageService, private _route: Router, private _dataService: DataService) { }

  ngOnInit(): void {

    this.cols = [
      {
        header: 'ProductTitle',
        field: 'ProductTitle',
      },
      {
        header: 'UserEmail',
        field: 'UserEmail',
      },
      {
        header: 'Date',
        field: 'Date',
      },
      {
        header: 'LastOrderStatusTitle',
        field: 'LastOrderStatusTitle',
      }
    ];

    this.getData();

  }

  getData(): void {
    this.waiting = true;
    this._orderService
      .get(this.params)
      .subscribe(res => {
        this.data = res.Data.List;
        this.totalRecords = +res?.Data?.TotalCount;
        this.waiting = false;
        this.dataTemp = [...this.data];
      }, er => { this.waiting = false; });
  }

  delete(record: StatusHistory): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete admin ${record.Title}?`,
      accept: () => {
        this.waiting = true;
        this._orderService
          .deleteStatus(record.Id)
          .subscribe(res => {
            this.data = this.data.filter(row => row.Id !== record.Id);
            this.waiting = false;
            this._messageService.add({ severity: 'success', summary: 'Deleted Successfully!' });
          }, er => { this.waiting = false; });
      }
    });
  }


  editRow(row: Orders) {
    this._route.navigate(['dashboard/orders-status/' + row.Id]);
  }


  filterChange(query, colName) {
    this.waiting = true;
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
    this.params.PageSize = event.rows;
    this.params.PageNumber = event.page + 1;
    this.getData();
  }

}
