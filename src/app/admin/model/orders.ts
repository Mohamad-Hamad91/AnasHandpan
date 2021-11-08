import { BaseRequest } from "./baseRequest";
import { BaseResponse } from "./baseResponse";

export class OrdersReq extends BaseRequest {
    ProductId?: string;
    UserId?: string;
}

export class OrdersRes extends BaseResponse {
    Data: {
        List: Orders[];
        TotalCount: number;
    }
}

export class OrderRes extends BaseResponse {
    Data!: Orders;
}

export class Orders {
    Id: string;
    Quantity: number;
    Color: string;
    ProductId: string;
    ProductTitle: string;
    ProductPhoto: string;
    ProductPrice: number;
    UserId: string;
    UserFullName: string;
    UserEmail: string;
    UserPhone: string;
    Date: Date;
    LastOrderStatusDate: Date;
    LastOrderStatusTitle: string;
    StatusHistory: {
        List: StatusHistory[];
        TotalCount: number;
    }
}

export class StatusHistory {
    Id: string;
    Title: string;
    Date: Date;
    OrderId?: string;
}