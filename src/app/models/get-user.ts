export class GetUser {
    
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    expirationDate: Date;
    plan: number;



    constructor(username: string, password: string, firstName: string, lastName: string, email: string, expirationDate: Date, plan: number) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.expirationDate = expirationDate;
        this.plan = plan;
    }
}
