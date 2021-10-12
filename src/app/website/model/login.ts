import { BaseResponse } from "./baseResponse";

export class LoginRes extends BaseResponse {
    Data!: {
        SessionId: string;
        RoleId: number;
        Username: string;
    };
}

export class RegisterRes extends BaseResponse { }
export class VerifyRes extends BaseResponse { 
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

export class RegisterReq {
    Email!: string;
    Name!: string;
    Phone!: string;
    Password!: string;
    ConfirmPassowrd!: string;
}

export class VerifyReq {
    Email!: string | null;
    VerificationCode!: string;
}

export class VerifyResendReq {
    Email!: string | null;
}