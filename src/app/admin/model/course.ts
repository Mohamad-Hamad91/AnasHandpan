import { BaseRequest } from "./baseRequest";
import { BaseResponse } from "./baseResponse";

export class CourseReq extends BaseRequest { }

export class CourseRes extends BaseResponse {
    Data: {
        List: Course[];
        TotalCount: number;
    }
}

export class AddCourseRes extends BaseResponse {
    Data!: Course;
}

export class Course {
    Id: string;
    Title: string;
    Photo: string;
    Price: number;
    Brief: string;
    Description: string;
    Demo: string;
    AppearInHomePage: number;
    isEditable: boolean;
}