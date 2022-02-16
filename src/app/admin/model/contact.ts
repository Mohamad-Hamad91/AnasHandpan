import { BaseRequest } from "./baseRequest";
import { BaseResponse } from "./baseResponse";

export class ContactInfoReq extends BaseRequest { }

export class ContactInfoRes extends BaseResponse {
    Data: {
        List: ContactInfo[];
        TotalCount: number;
    };
}

export class ContactMessageRes extends BaseResponse {
    Data: {
        List: ContactMessage[];
        TotalCount: number;
    };
}

export class AddInfoRes extends BaseResponse {
    Data!: ContactInfo;
}

export class ContactInfo {
    Id: string;
    Icon: string;
    Name: string;
    Value: string;
    SortOrder: number | string;
    isEditable: boolean;
}

export class ContactMessage {
    Id: string;
    Name: string;
    Email: string;
    Phone: string;
    Subject: string;
    Message: string;
    Date: Date;
    isEditable: boolean;
}