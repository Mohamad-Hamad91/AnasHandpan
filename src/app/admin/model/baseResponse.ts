export class BaseResponse {
    Code: number = 200;
    Message: string | undefined;
    Data: any;
}