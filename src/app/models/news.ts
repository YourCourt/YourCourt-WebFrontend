import { Image } from "./image";
import { User } from "./user";

export class News {
    id:number;
    name:string;
    image:Image;
    description:string;
    creationDate:Date;
    editionDate:Date;
    comments:Array<Comment>


    constructor(name: string, description: string) {
        this.name = name;
        this.description = description
    }
}

export class Comment {
    id:number;
    content:string;
    image:Image;
    creationDate:Date;
    user:User;
    newsId:number;


    constructor(content: string,newsId:number) {
        this.content = content;
        this.newsId = newsId;
    }

}
