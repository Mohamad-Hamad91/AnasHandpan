import { BaseRequest } from "./baseRequest";
import { BaseResponse } from "./baseResponse";

export class ProductReq extends BaseRequest { }

export class ProductRes extends BaseResponse {
    Data: {
        List: Product[];
        TotalCount: number;
    }
}

export class AddProductRes extends BaseResponse {
    Data!: Product;
}

export class Product {
    Id: string;
    Title: string;
    Photo: string;
    Price: number;
    Description: string;
    Avaliable: number;
    AppearInHomePage: number;
    AcceptColor: number;
    AcceptQuantity: number;
    Photos: string[];
    Places: Place[];
    isEditable: boolean;
    Orders: Orders = new Orders();
}

export class Place {
    Name: string;
    Location: string;
    Photo: string;
}


export class Orders {
    List: Order[] = new Array();
    TotlaCount: number;
}
export class Order {
    Id: string;
    Quantity: number;
    Color: string;
    ProductId: string;
    ProductTitle: string;
    ProductPhoto: string;
    ProductPrice: string;
    UserId: string;
    UserFullName: string;
    UserEmail: string;
    UserPhone: string;
    Date: string;
    LastOrderStatusDate: Date;
    LastOrderStatusTitle: string;
}