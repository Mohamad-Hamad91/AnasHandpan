import { BaseRequest } from "./baseRequest";
import { BaseResponse } from "./baseResponse";

export class MusicReq extends BaseRequest { }

export class MusicRes extends BaseResponse {
    Data: {
        List: Music[];
        TotalCount: number;
    }
}

export class AddMusicRes extends BaseResponse {
    Data!: Music;
}

export class Music {
    Id: string;
    Name: string;
    Url: string;
    SortOrder: string;
    isEditable: boolean;
}