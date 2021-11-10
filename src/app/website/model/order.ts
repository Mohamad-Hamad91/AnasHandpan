import { BaseRequest } from "src/app/admin/model/baseRequest";
import { BaseResponse } from "./baseResponse";

export class Order {
    Id: string;
    ProductId: string;
    ProductTitle: string;
    Quantity: number;
    Color: string;
    Date: Date;
    ProductPrice: number;
    ProductPhoto: string;
    ProductThumbnail: string;

}

export class OrderReq extends BaseRequest { }

export class OrderRes extends BaseResponse {
    Data: {
        List: Order[];
        TotalCount: number;
    };
}

export class AddOrderReq {
    ProductId: string;
    Quantity: number;
    Color: string;
}

export class AddOrderRes extends BaseResponse {
}

