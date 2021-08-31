export class NewUser {
    
    username: string;
    password: string;
    email: string;
    birthDate: Date;
    phone: string;
    membershipNumber: string;

    constructor(username: string, password: string, email: string, birthDate: Date, phone: string, membershipNumber: string) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.birthDate=birthDate;
        this.phone=phone;
        this.membershipNumber=membershipNumber;
    }

}

export class UpdateUser {
    
    email: string;
    birthDate: Date;
    phone: string;

    constructor(email: string, birthDate: Date, phone: string) {
 
        this.email = email;
        this.birthDate=birthDate;
        this.phone=phone;
    }

}
