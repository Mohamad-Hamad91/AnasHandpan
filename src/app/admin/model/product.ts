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
}

export class Place {
    Name: string;
    Location: string;
    Photo: string;
}