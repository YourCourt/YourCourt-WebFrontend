import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as bookingUtils from 'src/app/components/booking/bookingUtils';
import * as appUtils from 'src/app/appUtils';
import { BookingService } from 'src/app/services/booking.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BookingDto, Line } from 'src/app/models/booking';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductType } from 'src/app/models/product';
import { ToastService } from 'src/app/services/toast.service';
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
  formSearch: FormGroup;
  bookedProducts: FormArray = new FormArray([]);

  products: Product[];
  productTypes: ProductType[];
  lowStock: number = appUtils.LOW_STOCK;

  gridColumns = 2;
  loading:boolean=false;

  constructor(
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastService: ToastService
  ) {
    this.formSearch = formBuilder.group({
      productType: ['', Validators.required],
    });
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

    this.getAllProductTypes();
  }

  getAllProductTypes() {
    this.productService.getAllProductTypes().subscribe(
      (data) => {
        this.productTypes = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSearch() {
    this.getAllBookableProductsByProductType(this.formSearch.value.productType);
  }

  getAllBookableProductsByProductType(typeName: string) {
    this.productService.getBookeableProductsByTypeName(typeName).subscribe(
      (data) => {
        this.products = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true, size: 'xl' });
  }

  bookProduct(item: Product) {
    if (
      this.bookedProducts.value.find((controls) => controls.item === item) ===
      undefined
    ) {
      //If has not been added yet

      const control = new FormControl(
        { item: item, quantity: 1 },
        Validators.required
      );
      this.bookedProducts.push(control);
      appUtils.showSuccess(this.toastService,'Producto añadido')
    } else {
      appUtils.showDanger(
        this.toastService,
        'El producto ya se encuentra añadido'
      );
    }
  }

  removeProduct(bookedProduct: { item: Product; quantity: number }) {
    let found: AbstractControl = this.bookedProducts.controls.find(
      (control) => control.value === bookedProduct
    );
    let foundIndex = this.bookedProducts.controls.indexOf(found);
    this.bookedProducts.removeAt(foundIndex);
    appUtils.showSuccess(this.toastService,'Producto eliminado')
  }

  getBookingLines() {
    let lines: Array<Line> = [];
    let discount: number = 0;
    for (let bookedProduct of this.bookedProducts.value) {
      lines.push(
        new Line(discount, bookedProduct.quantity, bookedProduct.item.id)
      );
    }
    return lines;
  }

  createBooking() {
    let bookingCreated = new BookingDto(
      this.courtId,
      this.userId,
      this.startDate,
      this.endDate,
      this.getBookingLines()
    );

    this.bookingService.createBooking(bookingCreated).subscribe(
      (data) => {
        this.loading=true;
        appUtils.showSuccess(this.toastService,'Reserva creada')
        return appUtils.promiseReload(
          this.router,
          '/reservas/' + data.id,
          3000
        );
      },
      (err) => {
        appUtils.showDanger(this.toastService,'Error desconocido')
      }
    );
  }
}
