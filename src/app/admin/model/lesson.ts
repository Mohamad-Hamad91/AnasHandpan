import { BaseRequest } from "./baseRequest";
import { BaseResponse } from "./baseResponse";

export class LessonReq extends BaseRequest { 
    CourseId: string;
}

export class LessonRes extends BaseResponse {
    Data: {
        List: Lesson[];
        TotalCount: number;
    }
}

export class AddLessonRes extends BaseResponse {
    Data!: Lesson;
}

export class Lesson {
    Id: string;
    CourseId: string;
    Title: string;
    Photo: string;
    Video: string;
    Description: string;
    SortOrder: number;
    isEditable: boolean;
}