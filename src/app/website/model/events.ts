import { BaseRequest } from "src/app/admin/model/baseRequest";
import { BaseResponse } from "./baseResponse";

export class Events {
    Id: string;
    Title: string;
    Photo: string;
    Thumbnail: string;
    Date: Date;
    Location: string;
    Venue: string;
}

export class EventsReq extends BaseRequest { }
export class EventsRes extends BaseResponse {
    Data: {
        List: Events[];
        TotalCount: number;
    };
}

export class SingleEventsRes extends BaseResponse {
    Data: SingleEvent;
}

export class SingleEvent {
    Id: string;
    Title: string;
    Photo: string;
    Date: Date;
    Location: string;
    Venue: string;
    Thumbnail: string;
    Description: string;
    Photos: string[];
    Videos: string[];
}