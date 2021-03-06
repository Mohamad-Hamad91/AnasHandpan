import { BaseRequest } from "src/app/admin/model/baseRequest";
import { BaseResponse } from "./baseResponse";

export class Album {
    Id: string;
    Name: string;
    Photo: string;
    DiskPhoto: string;
    Genre: string;
    ReleaseDate: string;
    Thumbnail: string;
}

export class NewReq extends BaseRequest { }

export class AlbumRes extends BaseResponse {
    Data: {
        List: Album[];
        TotalCount: number;
    };
}

export class SingleAlbumRes extends BaseResponse {
    Data: SingleAlbum;
}

export class SingleAlbum {
    Id: string;
    Name: string;
    Photo: string;
    Thumbnail: string;
    Genre: string;
    Description: string;
    ReleaseDate: string;
    Songs: Song[];
}


export class Song {
    Name: string;
    Url: string;
    SortOrder: number;
    Duration: string;
}