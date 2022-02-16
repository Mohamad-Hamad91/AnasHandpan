import { BaseResponse } from "./baseResponse";

export class ContactInfoRes extends BaseResponse {
    Data: {
        List: ContactInfo[];
        TotalCount: number;
    };
}

export class ContactInfo {
    Id: string;
    Icon: string;
    Name: string;
    Value: string;
}

export class ContactForm {
    Name: string;
    Email: string;
    Phone: string;
    Subject: string;
    Message: string;
}