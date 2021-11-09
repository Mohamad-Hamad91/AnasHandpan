import { BaseResponse } from "./baseResponse";

export class News {
    Id: string;
    Title: string;
    Photo: string;
    Brief: string;
    Date: Date;
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