import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SingleProduct } from '../model/product';
import { ProductService } from '../service/product.service';
import { environment } from 'src/environments/environment';
import { OrderService } from '../service/order.service';
import { AddOrderReq } from '../model/order';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.less']
})
export class SingleProductComponent implements OnInit {

  data: SingleProduct = new SingleProduct();
  waiting: boolean = true;
  productId: string;
  baseURL = environment.baseURL;
  order: AddOrderReq = new AddOrderReq();
  role: string;
  isLoggedIn: boolean = false;

  constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute,
    private _messageService: MessageService, private _orderService: OrderService) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.productId = this._activatedRoute.snapshot.params.id;
      this.getData();
      this.order = {
        ProductId: this.productId,
        Color: 'Black',
        Quantity: 1
      };
    });
    this.isLoggedIn = !!localStorage.getItem('sID');
    this.role = localStorage.getItem('role');
  }

  getData() {
    this.waiting = true;
    this._productService
      .get(this.productId)
      .subscribe(res => {
        this.data = res.Data;
        this.waiting = false;
      }, er => this.waiting = false);
  }

  addOrder() {
    if(!this.isLoggedIn || this.role != 'USER') {
      this._messageService.add({
        severity: 'info',
        summary: 'Not Logged-in!',
        life: 10000,
        detail: 'Please Login to Order this item.',
      });
      return;
    } else {
      this.waiting = true;
      let temp: any = { ...this.order };
      temp.Quantity = temp.Quantity.toString();
      this._orderService.add(temp)
        .subscribe(res => {
          this.waiting = false;
          this._messageService.add({
            severity: 'success',
            summary: 'Done!',
            life: 10000,
            detail: 'Your order is pending now, please check status in my orders page.',
          });
        }, er => this.waiting = false);
    }
  }

}
