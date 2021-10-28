import { BaseRequest } from "./baseRequest";
import { BaseResponse } from "./baseResponse";

export class SectionsReq extends BaseRequest { }

export class SectionsRes extends BaseResponse {
    Data: Section;
}

export class Section {
    Courses: number;
    MyCourses: number;
    Products: number;
    MyOrders: number;
    Albums: number;
    Events: number;
    News: number;
};