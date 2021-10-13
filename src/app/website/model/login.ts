import { BaseResponse } from "./baseResponse";

export class LoginRes extends BaseResponse {
    Data!: {
        SessionId: string;
        Profile: {
            Email: String;
            Name: String
            Phone: String;
            IsGoogleUser: Number;
            IsAppleUser: Number;
        };
    };
}

export class RegisterRes extends BaseResponse { }
export class VerifyRes extends BaseResponse {
    Data!: {
        SessionId: string;
        Profile: {
            Email: String;
            Name: String
            Phone: String;
            IsGoogleUser: Number;
            IsAppleUser: Number;
        };
    };
}

export class LoginReq {
    Email!: string;
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

export class ResendForgetPassCodeReq {
    Email!: string | null;
    ForgetPasswordRequestId!: string | null;
}

export class ForgetPassCodeRes extends BaseResponse{
    Data!: {
        ForgetPasswordRequestId: String;
    };
}

export class ForgetPassResetReq {
    Email!: string | null;
    RequestForgetPasswordId!: string | null;
    ForgetPasswordCode!: string;
    NewPassword!: string;
    ConfirmPassword!: string;
}