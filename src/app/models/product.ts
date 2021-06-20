import { Image } from './image';

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  tax: number;
  image: Image;

  constructor(
    name: string,
    description: string,
    price: number,
    stock: number,
    tax: number
  ) {
    this.name = name;
    this.description = description;
    this.stock = stock;
    this.tax = tax;
    this.price = price;
  }
}
