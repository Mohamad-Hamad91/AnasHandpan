import { BaseRequest } from "./baseRequest";
import { BaseResponse } from "./baseResponse";

export class Role {
    Id!: number;
    Title!: string;
}

export class RoleRes extends BaseResponse {
    Data!: {
        List: Role[];
        TotalCount: number;
    };
}

export class AdminsReq extends BaseRequest { }

export class Admin {
    Id!: string;
    Username!: string;
    Password!: string;
    ConfirmPassword!: string;
    RoleId!: number;
    Role: Role | undefined;
    isEditable: unknown;
    RoleName: any;
}

export class AdminsRes extends BaseResponse {
    Data!: {
        List: Admin[];
        TotalCount: number;
    };
}

export class AddAdminRes extends BaseResponse {
    Data!: Admin;
}
