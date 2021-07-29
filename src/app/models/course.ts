import { User } from "./user";

export class Course {

    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;

    constructor( title: string, description: string, startDate: Date, endDate: Date) {
        this.title = title;
        this.description = description
        this.startDate = startDate
        this.endDate = endDate
    }

}

export class Inscription {
    id:number;
    name: string;
    surnames: string;
    email: string;
    phone: string;
    observations: string;
    user: number;
    course: Course;

    constructor(name: string, surnames: string, email: string, phone: string, observations: string) {
        this.name = name;
        this.surnames = surnames;
        this.email = email
        this.phone = phone
        this.observations = observations
    }

}
