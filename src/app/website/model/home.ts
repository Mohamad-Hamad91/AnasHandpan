import { Album } from "./album";
import { BaseResponse } from "./baseResponse";
import { Course } from "./course";
import { Events } from "./events";
import { Music } from "./music";
import { News } from "./news";
import { Product } from "./product";
import { Sections } from "./sections";
import { SocialLinks } from "./socialLinks";

export class HomeRes extends BaseResponse {
    Data: Home;
}

export class Home {
    CoverPhoto: string;
    PersonalInfo: string;
    SideMenu: Sections;
    SocialMediaLinks: SocialLinks[];
    Albums: Album[];
    Events: Events[];
    News: News[];
    Courses: Course[];
    Products: Product[];
    Music: Music[];
}

export class Cover {
    CoverPhoto: string;
    PersonalInfo: string;
}