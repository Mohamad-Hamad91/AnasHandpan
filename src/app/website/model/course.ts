import { BaseRequest } from "src/app/admin/model/baseRequest";
import { BaseResponse } from "./baseResponse";

export class CourseReq extends BaseRequest { }

export class LessonsReq extends BaseRequest {
    CourseId: string;
}
export class Course {
    Id: string;
    Title: string;
    Photo: string;
    Thumbnail: string;
    Price: number;
    Brief: string;
}

export class CourseRes extends BaseResponse {
    Data: {
        List: Course[];
        TotalCount: number;
    };
}

export class SingleCourseRes extends BaseResponse {
    Data: SingleCourse;
}

export class SingleCourse {
    Id: string;
    Title: string;
    Photo: string;
    Thumbnail: string;
    Price: number;
    Brief: string;
    Description: string;
    Demo: string;
    IsEnrolled: number;
    Lessons: {
        List: CouerseLessone[];
        TotalCount: number;
    }
}

export class CouerseLessone {
    Id: string;
    Title: string;
    Photo: string;
    Thumbnail: string;
    IsWatched: number;
}

export class EnrollmentReq {
    CourseId: string;
}


export class LessonRes extends BaseResponse {
    Data: {
        List: Lesson[];
        TotalCount: number;
    };
}

export class SingleLessonRes extends BaseResponse {
    Data: SingleLesson;
}
export class Lesson {

}

export class SingleLesson {
    Id: string;
    Title: string;
    Photo: string;
    Thumbnail: string;
    IsWatched: number;
    Video: string;
    Description: string;
}
