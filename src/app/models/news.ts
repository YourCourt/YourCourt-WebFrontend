import { Image } from "./image";

export class News {
    id:number;
    name:string;
    image:Image;
    description:string;
    creationDate:Date;
    editionDate:Date;


    constructor(name: string, description: string) {
        this.name = name;
        this.description = description
    }
}
