import { BaseRequest } from "./baseRequest";
import { BaseResponse } from "./baseResponse";

export class SocialMediaReq extends BaseRequest { }

export class SocialMediaRes extends BaseResponse {
    Data: {
        List: SocialMedia[];
        TotalCount: number;
    }
}

export class AddSocialRes extends BaseResponse {
    Data!: SocialMedia;
}

export class SocialMedia {
    Id: string;
    Icon: string;
    Name: string;
    Url: string;
    SortOrder: string;
    isEditable: boolean;
}