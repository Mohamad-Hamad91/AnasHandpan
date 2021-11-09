import { BaseRequest } from "src/app/admin/model/baseRequest";
import { BaseResponse } from "./baseResponse";


export class NewReq extends BaseRequest {}
export class News {
    Id: string;
    Title: string;
    Photo: string;
    Brief: string;
    Date: Date;
}

export class NewsRes extends BaseResponse {
    Data: {
        List: News[];
        TotalCount: number;
    };
}

export class SingleNewsRes extends BaseResponse {
    Data: SingleNews;
}

export class SingleNews {
    Id: string;
    Title: string;
    Photo: string;
    Thumbnail: string;
    Brief: string;
    Date: Date;
    Description: string;
    Photos: string[];
    Videos: string[];
}