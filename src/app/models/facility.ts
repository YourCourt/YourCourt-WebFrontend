import { Image } from "./image";

export class Facility {
    id: number;
    name: string;
    description: string;
    facilityType: FacilityType;
    image: Image;

    constructor(name: string, description: string, facilityType: FacilityType) {
        this.name = name;
        this.description = description
        this.facilityType = facilityType
    }
}

export class FacilityType {
    id: number;
    typeName: string;

    constructor(typeName: string) {
        this.typeName = typeName;
    }
}
