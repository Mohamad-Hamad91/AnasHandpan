import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { Orders, StatusHistory } from '../model/orders';
import { TableColumn } from '../model/tableColumn';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-status-management',
  templateUrl: './order-status-management.component.html',
  styleUrls: ['./order-status-management.component.less']
})
export class OrderStatusManagementComponent implements OnInit {

  data: Orders;
  dataTemp: Orders;
  waiting: boolean = true;
  orderId: string;
  cols: TableColumn[] = new Array();
  criteria: any = {};
  filtersNo: number = 0;
  submitted: boolean;
  dialog: boolean;
  item: StatusHistory;
  baseURL: string = environment.baseURL;

  constructor(private _orderService: OrderService, private confirmationService: ConfirmationService,
    private _messageService: MessageService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.orderId = this._activatedRoute.snapshot.params.id;
      this.getData();
    });

    this.cols = [
      {
        header: 'Title',
        field: 'Title',
      },
      {
        header: 'Date',
        field: 'Date',
      }
    ];
  }

  getData() {
    this.waiting = true;
    this._orderService
      .getOne(this.orderId)
      .subscribe(res => {
        this.data = res.Data;
        this.waiting = false;
      }, er => this.waiting = false);
  }


  delete(record: StatusHistory): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${record.Title}?`,
      accept: () => {
        this.waiting = true;
        this._orderService
          .deleteStatus(record.Id)
          .subscribe(res => {
            this.waiting = false;
            this.data.StatusHistory.List = this.data.StatusHistory.List.filter(rec => rec.Id !== record.Id);
            this._messageService.add({ severity: 'success', summary: 'Deleted Successfully!' });
          }, er => this.waiting = false);
      }
    });
  }


  editRow(row: StatusHistory) {
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
        this.data.StatusHistory.List = [...this.dataTemp.StatusHistory.List];
        this.filtersNo = 0;
      } else {
        for (const key in this.criteria) {
          if (Object.prototype.hasOwnProperty.call(this.criteria, key)) {
            const element = this.criteria[key];
            this.data.StatusHistory.List = this.dataTemp.StatusHistory.List?.filter(value => value[key]?.toString().toLowerCase().includes(element.toString().toLowerCase()));
          }
        }
      }
    } else {
      this.filtersNo++;
      this.data.StatusHistory.List = [...this.dataTemp.StatusHistory.List];
      for (const key in this.criteria) {
        if (Object.prototype.hasOwnProperty.call(this.criteria, key)) {
          const element = this.criteria[key];
          this.data.StatusHistory.List = this.data?.StatusHistory.List.filter(value => value[key]?.toString().toLowerCase().includes(element.toString().toLowerCase()));
        }
      } // end of for each criteria field
    }
    this.waiting = false;

  }

  clearFilter() {
    this.criteria = {};
    this.data.StatusHistory.List = [...this.dataTemp.StatusHistory.List];
    this.filtersNo = 0;
  }


  openNew() {
    this.item = new StatusHistory();
    this.item.OrderId = this.orderId;
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
    this.item.OrderId = this.orderId;
    this._orderService
      .addStatus(this.item)
      .subscribe(res => {
        this._messageService.add({ severity: 'success', summary: 'Created Successfully!' });
        this.getData();
      }, er => this.waiting = false);
  }

}
