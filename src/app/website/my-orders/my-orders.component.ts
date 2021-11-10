import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order, OrderReq } from '../model/order';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.less']
})
export class MyOrdersComponent implements OnInit {

  data: Order[] = new Array();
  params: OrderReq = { PageNumber: 1, PageSize: 9 };
  waiting: boolean = true;
  baseURL: string = environment.baseURL;
  totlaCount: number = 0;

  constructor(private _orderService: OrderService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._orderService.getAll(this.params)
    .subscribe(res => {
      this.data.push(...res.Data.List);
      this.totlaCount = +res.Data.TotalCount;
      this.waiting = false;
    }, er => this.waiting = false);
  }

  loadMore() {
    this.params.PageNumber++;
    this.getData();
  }

}
