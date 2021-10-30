import { BaseRequest } from "./baseRequest";
import { BaseResponse } from "./baseResponse";

export class NewsReq extends BaseRequest { }

export class NewsRes extends BaseResponse {
    Data: {
        List: News[];
        TotalCount: number;
    }
}

export class AddNewsRes extends BaseResponse {
    Data!: News;
}

export class News {
    Id: string;
    Title: string;
    Photo: string;
    Brief: string;
    Description: string;
    Date: Date;
    Photos: string[];
    Videos: string[];
    isEditable: boolean;
}