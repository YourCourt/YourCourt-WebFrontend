import { Image } from "./image";

export class Court {
    id: number;
    name: string;
    description: string;
    courtType: string;
    image: Image;

    constructor(name: string, description: string, courtType: string) {
        this.name = name;
        this.description = description
        this.courtType = courtType
    }
}
