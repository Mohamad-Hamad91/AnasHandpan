import { BaseResponse } from "./baseResponse";

export class LoginRes extends BaseResponse {
    Data!: {
        SessionId: string;
        RoleId: number;
        Username: string;
    };
}

export class LoginReq {
    Username!: string;
    Password!: string;
}