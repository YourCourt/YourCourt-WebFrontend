export class Purchase {
    id: number;
    creationDate: Date;
    user: number;
    productPurchaseSum: number;
    lines: Array<Line>;
}

export class PurchaseDto {
    user: number;
    lines: Array<Line>;

    constructor(user: number, lines: Array<Line>) {
        this.user = user;
        this.lines = lines;
    }
}

export class Line {
    discount: number;
    quantity: number;
    productId: number;

    constructor(discount: number, quantity: number, productId: number) {
        this.discount = discount;
        this.quantity = quantity;
        this.productId = productId;
    }
}
