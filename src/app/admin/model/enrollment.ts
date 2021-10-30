import { BaseRequest } from "./baseRequest";
import { BaseResponse } from "./baseResponse";

export class EnrollmentReq extends BaseRequest { 
    CourseId: string;
}

export class EnrollmentRes extends BaseResponse {
    Data: {
        List: Enrollment[];
        TotalCount: number;
    }
}

export class Enrollment {
    Id: string;
    CourseId: string;
    UserId: string;
    UserEmail: string;
    UserFullName: string;
    Date: Date;
}