import { Image } from './image';

export class Product {
  id: number;
  name: string;
  description: string;
  productType:string;
  price: number;
  bookPrice:number;
  totalPrice: number;
  stock: number;
  tax: number;
  image: Image;

  constructor(
    name: string,
    description: string,
    price: number,
    bookPrice:number,
    stock: number,
    tax: number
  ) {
    this.name = name;
    this.description = description;
    this.stock = stock;
    this.tax = tax;
    this.price = price;
    this.bookPrice = bookPrice;
  }
}

export class ProductType {
  id: number;
  typeName: string;

  constructor(typeName: string) {
    this.typeName = typeName;
  }
}

export class ProductDto {
  name: string;
  description: string;
  productType: string;
  price: number;
  bookPrice:number;
  stock: number;
  tax: number;

  constructor(
    name: string,
    description: string,
    productType: string,
    price: number,
    bookPrice:number,
    stock: number,
    tax: number
  ) {
    this.name = name;
    this.description = description;
    this.productType = productType;
    this.stock = stock;
    this.tax = tax;
    this.price = price;
    this.bookPrice = bookPrice;
  }
}