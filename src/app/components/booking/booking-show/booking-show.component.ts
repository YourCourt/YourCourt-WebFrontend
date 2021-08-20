import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-booking-show',
  templateUrl: './booking-show.component.html',
  styleUrls: ['./booking-show.component.css'],
})
export class BookingShowComponent implements OnInit {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private productService: ProductService,
    public toastService: ToastService
  ) {
    this.isAdmin = appUtils.isAdminUser(this.tokenService)

  }
  booking: Booking;
  lines: Array<{
    product: Product;
    quantity: number;
    discount: number;
  }> = [];

  isAdmin: boolean
  user: User;purchaseUser:User;
  isBookingOwner: boolean;
  today:Date;

  ngOnInit(): void {
    this.getBooking();

  }

  setAccesibility() {
    this.authService.showUser(this.tokenService.getUsername()).subscribe(
      (data) => {
        this.user = data;
        this.isBookingOwner = this.user.id === this.booking.user;
        if (this.isBookingOwner==false && this.isAdmin==false) {
          appUtils.showDanger(this.toastService, 'Usuario incorrecto')
          return appUtils.promiseReload(this.router, '/pistas/', 500);
        }
      },
      (err) => {
        appUtils.showDanger(this.toastService, 'Usuario incorrecto');
        return appUtils.promiseReload(this.router, '/pistas/', 500);
      }
    );
  }


  getBooking(): void {
    this.today = new Date();

    this.bookingService
      .getBooking(Number(this.activatedRoute.snapshot.paramMap.get('id')))
      .subscribe(
        (data) => {
          this.booking = data;

          this.setAccesibility();
          this.booking.creationDate = new Date(data.creationDate);
          this.booking.startDate = new Date(data.startDate);
          this.booking.endDate = new Date(data.endDate);
          
          for (let line of this.booking.productBooking.lines) {
            this.productService
              .getProductById(line.productId)
              .subscribe((product) => {
                let lineWithProduct: {
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
          appUtils.showDanger(this.toastService, 'Reserva inexistente');
          return appUtils.promiseReload(this.router, '/pistas/', 500);
        }
      );
  }

  deleteBooking() {
    this.bookingService.deleteBooking(this.booking.id).subscribe(
      (data) => {
        appUtils.showSuccess(this.toastService, 'Reserva eliminada')
        return appUtils.promiseReload(this.router, '/pistas/', 2000);
      },
      (err) => {
        appUtils.showDanger(this.toastService, err)
      }
    );
  }
}
