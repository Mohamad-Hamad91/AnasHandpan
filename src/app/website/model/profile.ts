import { BaseRequest } from "src/app/admin/model/baseRequest";
import { BaseResponse } from "./baseResponse";

export class Profile {
    Email: string;
    Name: string;
    Phone: string;
    IsGoogleUser: number;
    IsAppleUser: number;
}

export class ProfileReq extends BaseRequest { }

export class ProfileRes extends BaseResponse {
    Data: Profile;
}