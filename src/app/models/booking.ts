import { Line } from "./purchase";

export class BookingDto {
    court: number;
    user: number;
    startDate: string;
    endDate: string;
    lines: Array<Line>;

    constructor(court: number, user: number, startDate: string, endDate: string, lines: Array<Line>) {
        this.court = court;
        this.user = user
        this.startDate = startDate
        this.endDate = endDate
        this.lines = lines
    }
}



export class Booking {
    id: number;
    court: number;
    user: number;
    startDate: Date;
    endDate: Date;
    creationDate: Date;
    productBooking: ProductBooking;
    productBookingSum: number;

    constructor(id: number, court: number, user: number, startDate: Date, endDate: Date, creationDate: Date, productBooking: ProductBooking, productBookingSum: number) {
        this.id = id;
        this.court = court;
        this.user = user
        this.startDate = startDate
        this.endDate = endDate
        this.creationDate = creationDate
        this.productBooking = productBooking
        this.productBookingSum = productBookingSum
    }
}
export class ProductBooking { id: number; booking: number; lines: Array<Line>; }