import { BaseRequest } from "./baseRequest";
import { BaseResponse } from "./baseResponse";

export class AlbumReq extends BaseRequest { }

export class AlbumRes extends BaseResponse {
    Data: {
        List: Album[];
        TotalCount: number;
    }
}

export class AddAlbumRes extends BaseResponse {
    Data!: Album;
}

export class Album {
    Id: string;
    Name: string;
    Photo: string;
    Genre: string;
    ReleaseDate: Date;
    AppearInHomePage: number;
    isEditable: boolean;
    Songs: Song[];
}

export class Song {
    Name: string;
    Url: string;
    SortOrder: number;
}