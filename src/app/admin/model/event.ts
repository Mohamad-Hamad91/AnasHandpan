import { BaseRequest } from "./baseRequest";
import { BaseResponse } from "./baseResponse";

export class EventReq extends BaseRequest { }

export class EventRes extends BaseResponse {
    Data: {
        List: Events[];
        TotalCount: number;
    }
}

export class AddEventRes extends BaseResponse {
    Data!: Events;
}

export class Events {
    Id: string;
    Title: string;
    Photo: string;
    Venue: string;
    Location: string;
    Description: string;
    Date: Date;
    Photos: string[];
    Videos: string[];
    isEditable: boolean;
}