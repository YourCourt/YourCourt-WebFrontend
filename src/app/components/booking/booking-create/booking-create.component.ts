import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as bookingUtils from 'src/app/components/booking/bookingUtils';
import * as appUtils from 'src/app/appUtils';
import { BookingService } from 'src/app/services/booking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingDto } from 'src/app/models/booking';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-booking-create',
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.css'],
})
export class BookingCreateComponent implements OnInit {
  start_hour: string;
  end_hour: string;
  day: number;
  month: string;
  year: number;
  courtId: number;
  userId: number;
  startDate: string;
  endDate: string;
  form: FormGroup;

  products: Product[];
  lowStock: number = appUtils.LOW_STOCK;

  constructor(
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.form = formBuilder.group({});
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      (this.start_hour = params['start_hour']),
        (this.end_hour = params['end_hour']),
        (this.day = params['day']),
        (this.month = params['month']),
        (this.year = params['year']),
        (this.courtId = params['courtId']),
        (this.userId = params['userId']);
    });
    this.startDate =
      this.year.toString() +
      '-' +
      this.month +
      '-' +
      this.day.toString() +
      'T' +
      this.start_hour;
    this.endDate =
      this.year.toString() +
      '-' +
      this.month +
      '-' +
      this.day.toString() +
      'T' +
      this.end_hour;

    this.getAllProducts();
  }

  createBooking() {
    let bookingCreated = new BookingDto(
      this.courtId,
      2,
      this.startDate,
      this.endDate,
      []
    );

    this.bookingService.createBooking(bookingCreated).subscribe(
      (data) => {
        return appUtils.promiseReload(
          this.router,
          '/reservas/' + data.id,
          2000
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllProducts() {
    this.productService.getAll().subscribe(
      (data) => {
        this.products = data;
        let first = this.products[0];
        this.products.push(first);
        this.products.push(first);
        this.products.push(first);
        this.products.push(first);
        this.products.push(first);
        this.products.push(first);
        this.products.push(first);
        this.products.push(first);
        this.products.push(first);
        this.products.push(first);
        this.products.push(first);
        this.products.push(first);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openScrollableContent(longContent) {

    this.modalService.open(longContent, { scrollable: true, size: 'sm' });
  }
}
