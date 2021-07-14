import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils';
import * as bookingUtils from 'src/app/components/booking/bookingUtils';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-booking-show',
  templateUrl: './booking-show.component.html',
  styleUrls: ['./booking-show.component.css'],
})
export class BookingShowComponent implements OnInit {
  constructor(
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private productService: ProductService
  ) {}
  booking: Booking;
  lines: Array<{
    product: Product;
    quantity: number;
    discount: number;
}> = [];
  ngOnInit(): void {
    this.getBooking();
  }

  getBooking(): void {
    this.bookingService
      .getBooking(Number(this.activatedRoute.snapshot.paramMap.get('id')))
      .subscribe(
        (data) => {
          this.booking = data;
          this.booking.creationDate = new Date(data.creationDate);
          this.booking.startDate = new Date(data.startDate);
          this.booking.endDate = new Date(data.endDate);
          for (let line of this.booking.productBooking.lines) {
            this.productService
              .getProductById(line.productId)
              .subscribe((product) => {
                let lineWithProduct:{
                  product: Product;
                  quantity: number;
                  discount: number;
              } = {
                  'product': product,
                  'quantity': line.quantity,
                  'discount': line.discount,
                };
                this.lines.push(lineWithProduct);
              });
          }
        },
        (err) => {
          appUtils.redirect(this.router, '/pistas');
        }
      );
  }
}