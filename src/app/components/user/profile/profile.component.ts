import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { ToastService } from 'src/app/services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateUser } from 'src/app/models/user-dto';
import { ImageService } from 'src/app/services/image.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { InscriptionService } from 'src/app/services/inscription.service';
import { Purchase } from 'src/app/models/purchase';
import { Inscription } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';


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
    private purchaseService: PurchaseService,
    private courseService: CourseService,
    private inscriptionService: InscriptionService,
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

  isAdmin: boolean;
  isAdminProfile: boolean;
  user: User;
  systemUsers: User[];
  isProfileOwner: boolean;
  active = "datos";

  formUpdate: FormGroup;
  updateUser: UpdateUser;

  image: File;

  loading: boolean = false;

  pageSize: number = 4;

  AllBookings: Booking[] = [];
  pagedBookings: Booking[] = [];
  pageBookings: number = 1;
  collectionSizeBookings: number;

  AllPurchases: Purchase[] = [];
  pagedPurchases: Purchase[] = [];
  pagePurchases: number = 1;
  collectionSizePurchases: number;

  AllInscriptions: Inscription[] = [];
  pagedInscriptions: Inscription[] = [];
  pageInscriptions: number = 1;
  collectionSizeInscriptions: number;

  ngOnInit(): void {
    this.setAccesibility()


  }

  setAccesibility() {
    this.authService.showUser(this.activatedRoute.snapshot.paramMap.get('username')).subscribe(
      (data) => {
        this.user = data;
        this.isAdminProfile = data.roles.some((role) => role.roleType == "ROLE_ADMIN")
        this.isProfileOwner = this.user.username === this.tokenService.getUsername();
        if (this.isProfileOwner == false && this.isAdmin == false) {
          appUtils.showDanger(this.toastService, 'Usuario incorrecto')
          return appUtils.promiseReload(this.router, '/', 500);
        }
        this.loadBookingsByUser();
        this.loadPurchasesByUser();
        this.loadInscriptionsByUser();

        if (this.isAdmin) {
          this.loadUsers();
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

  deleteUserImage() {
    this.imageService.deleteUserImage(this.user.id).toPromise();
    appUtils.showSuccess(this.toastService, 'Imagen eliminada');
    appUtils.promiseReload(this.router, '/usuario/' + this.user.username, 1000)
  }

  deleteUser() {
    this.authService.deleteUser(this.user.id).subscribe(
      data => {
        appUtils.showSuccess(this.toastService, 'Usuario eliminado');
        appUtils.promiseReload(this.router, '/', 1000);

      }, err => { appUtils.showErrorMessages(err, this.toastService) });
  }

  loadBookingsByUser() {
    this.bookingService.getBookingsByUsername(this.activatedRoute.snapshot.paramMap.get('username')).subscribe(data => {
      this.AllBookings = data;
      this.collectionSizeBookings = data.length;
      this.refreshBookings()
    }, err => { appUtils.showErrorMessages(err, this.toastService) });
  }

  loadPurchasesByUser() {
    this.purchaseService.getAllPurchasesByUser(this.activatedRoute.snapshot.paramMap.get('username')).subscribe(data => {
      this.AllPurchases = data;
      this.collectionSizePurchases = data.length;
      this.refreshPurchases()
    }, err => { appUtils.showErrorMessages(err, this.toastService) });
  }

  loadInscriptionsByUser() {
    this.inscriptionService.getAllInscriptionsByUsername(this.activatedRoute.snapshot.paramMap.get('username')).subscribe(data => {
      this.AllInscriptions = data;
      this.collectionSizeInscriptions = data.length;
      this.refreshInscriptions()
    }, err => { appUtils.showErrorMessages(err, this.toastService) });
  }

  refreshBookings() {
    this.pagedBookings = this.AllBookings
      .map((booking, i) => ({ id: i + 1, ...booking }))
      .slice((this.pageBookings - 1) * this.pageSize, (this.pageBookings - 1) * this.pageSize + this.pageSize);
  }

  refreshPurchases() {
    this.pagedPurchases = this.AllPurchases
      .map((booking, i) => ({ id: i + 1, ...booking }))
      .slice((this.pagePurchases - 1) * this.pageSize, (this.pagePurchases - 1) * this.pageSize + this.pageSize);
  }

  refreshInscriptions() {
    this.pagedInscriptions = this.AllInscriptions
      .map((booking, i) => ({ id: i + 1, ...booking }))
      .slice((this.pageInscriptions - 1) * this.pageSize, (this.pageInscriptions - 1) * this.pageSize + this.pageSize);
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe(
      data => {
        this.systemUsers = data

      }, err => { appUtils.showErrorMessages(err, this.toastService) });
  }

}
