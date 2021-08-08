import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Facility } from 'src/app/models/facility';
import { AuthService } from 'src/app/services/auth.service';
import { FacilityService } from 'src/app/services/facility.service';
import { ToastService } from 'src/app/services/toast.service';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils';

@Component({
  selector: 'app-facility-show',
  templateUrl: './facility-show.component.html',
  styleUrls: ['./facility-show.component.css']
})
export class FacilityShowComponent implements OnInit {

  constructor(
    private facilityService: FacilityService,
    private tokenService: TokenService,
    private toastService: ToastService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  facility: Facility;

  userId: number;

  isAdmin: boolean = appUtils.isAdminUser(this.tokenService);
  isLogged: boolean = this.tokenService.getToken() != null;

  ngOnInit(): void {
    this.getFacility();

  }

  getFacility(): void {
    this.facilityService
      .getFacility(Number(this.activatedRoute.snapshot.paramMap.get('id')))
      .subscribe(
        (data) => {
          this.facility = data;
        },
        (err) => {
          appUtils.showErrorMessages(err,this.toastService)
          appUtils.redirect(this.router, '/instalaciones');
        }
      );
  }



  deleteFacility() {
    this.facilityService.deleteFacility(this.facility.id).subscribe(
      (data) => {
        appUtils.showSuccess(this.toastService, 'Instalación eliminada')
        return appUtils.promiseReload(this.router, '/instalaciones/', 2000);
      },
      (err) => {
        appUtils.showDanger(this.toastService, err)
      }
    );
  }

}
