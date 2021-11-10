import { BaseRequest } from "src/app/admin/model/baseRequest";
import { BaseResponse } from "./baseResponse";

export class Product {
    Id: string;
    Title: string;
    Photo: string;
    Thumbnail: string;
    Price: string;
}

export class ProductReq extends BaseRequest { }

export class ProductRes extends BaseResponse {
    Data: {
        List: Product[];
        TotalCount: number;
    };
}

export class SingleProductRes extends BaseResponse {
    Data: SingleProduct;
}

export class SingleProduct {
    Id: string;
    Title: string;
    Photo: string;
    Thumbnail: string;
    Price: string;
    Description: string;
    AcceptColor: number;
    AcceptQuantity: number;
    Photos: string[];
    Places: Place[];
}

export class Place {
    Name: string;
    Location: string;
    Photo: string;
    Thumbnail: string;
}