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

export class Line {
    discount: number;
    quantity: number;
    productId: number;

    constructor(discount: number, quantity: number, productId: number){
        this.discount=discount;
        this.quantity=quantity;
        this.productId=productId;
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