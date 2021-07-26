import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils';
import * as bookingUtils from 'src/app/components/booking/bookingUtils';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { ToastService } from 'src/app/services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateUser } from 'src/app/models/user-dto';
import { ImageService } from 'src/app/services/image.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private productService: ProductService,
    private imageService: ImageService,
    public toastService: ToastService,
    private formBuilder: FormBuilder) {
    this.isAdmin = appUtils.isAdminUser(this.tokenService)

    this.formUpdate = formBuilder.group({
      username: [''],
      email: ['', [Validators.email, Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      birthDate: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^(([+][(][0-9]{1,3}[)][ ])?([0-9]{6,12}))$")]],
      membershipNumber: ['']
    })
  }

  isAdmin: boolean
  user: User;
  isProfileOwner: boolean;
  active = "datos";

  formUpdate: FormGroup;
  updateUser: UpdateUser;

  image: File;

  loading: boolean = false;

  AllBookings:Booking[]=[];
  pagedBookings:Booking[]=[];
  page:number = 1;
  pageSize:number = 4;
  collectionSize:number;

  ngOnInit(): void {
    this.setAccesibility()
    this.loadBookingsByUser()
    
  }

  setAccesibility() {
    this.authService.showUser(this.activatedRoute.snapshot.paramMap.get('username')).subscribe(
      (data) => {
        this.user = data;
        this.isProfileOwner = this.user.username === this.tokenService.getUsername();
        if (this.isProfileOwner==false && this.isAdmin==false) {
          appUtils.showDanger(this.toastService, 'Usuario incorrecto')
          return appUtils.promiseReload(this.router, '/', 500);
        }

        this.formUpdate.controls['username'].setValue(data.username);
        this.formUpdate.controls['email'].setValue(data.email);
        this.formUpdate.controls['birthDate'].setValue(data.birthDate);
        this.formUpdate.controls['phone'].setValue(data.phone);
        this.formUpdate.controls['membershipNumber'].setValue(data.membershipNumber);
      },
      (err) => {
        appUtils.showDanger(this.toastService, 'Usuario incorrecto');
        return appUtils.promiseReload(this.router, '/', 500);
      }
    );
  }

  onUpdate(): void {

    this.updateUser = new UpdateUser(
      this.formUpdate.value.email,
      this.formUpdate.value.birthDate,
      this.formUpdate.value.phone,
    );

    this.authService.update(this.updateUser, this.user.id).subscribe(
      responseUpdate => {

        appUtils.showSuccess(this.toastService, 'Actualización exitosa');
        appUtils.promiseReload(this.router, '/usuario/' + this.user.username, 1000)
      }, errorUpdate => {

        appUtils.showErrorMessages(errorUpdate, this.toastService)

      }
    );

  }

  addUserImage(imageFile: FileList, image) {
    const file = imageFile.item(0)
    if (file.size <= 4000000 && file?.type == 'image/jpeg' || file?.type == 'image/png') {
      this.image = file
    } else {
      image.value = undefined
    }

    if (this.image != undefined) {

      this.imageService.newUserImage(this.user.id, this.image).subscribe(
        data => {
          appUtils.showSuccess(this.toastService, 'Actualización exitosa');
          appUtils.promiseReload(this.router, '/usuario/' + this.user.username, 1000)
        }, err => { appUtils.showErrorMessages(err, this.toastService) });
    }
  }

  deleteUserImage(){
    this.imageService.deleteUserImage(this.user.id).toPromise();
    appUtils.showSuccess(this.toastService, 'Imagen eliminada');
    appUtils.promiseReload(this.router, '/usuario/' + this.user.username, 1000)
  }

  loadBookingsByUser(){
    this.bookingService.getBookingsByUsername(this.activatedRoute.snapshot.paramMap.get('username')).subscribe(data => {
      this.AllBookings=data;
      this.collectionSize=data.length;
      this.refreshBookings()
    }, err => { appUtils.showErrorMessages(err, this.toastService) });

  }

  refreshBookings() {
    this.pagedBookings = this.AllBookings
      .map((booking, i) => ({id: i + 1, ...booking}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
