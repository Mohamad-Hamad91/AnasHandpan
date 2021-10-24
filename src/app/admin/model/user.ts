import { BaseRequest } from "./baseRequest";
import { BaseResponse } from "./baseResponse";

export class User {
    Id!: string;
    Email!: string;
    Name!: string;
    Phone!: string;
    JoinDate: Date;
}

export class UsersRes extends BaseResponse {
    Data!: {
        List: User[];
        TotalCount: number;
    };
}

export class UsersReq extends BaseRequest { }