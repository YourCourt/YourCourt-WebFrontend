import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils';
import { DatePipe } from '@angular/common';
import {
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { ToastService } from 'src/app/services/toast.service';
import { CourseService } from 'src/app/services/course.service';
import { Course, Inscription } from 'src/app/models/course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscriptionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-inscription-show',
  templateUrl: './inscription-show.component.html',
  styleUrls: ['./inscription-show.component.css']
})
export class InscriptionShowComponent implements OnInit {


  constructor(
    private inscriptionService: InscriptionService,
    private courseService: CourseService,
    private tokenService: TokenService,
    private toastService: ToastService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public datepipe: DatePipe,
    private formBuilder: FormBuilder
  ) { }

  inscription: Inscription;

  user: User;
  course:Course;
  loading: boolean;

  isAdmin: boolean = appUtils.isAdminUser(this.tokenService)

  inscriptionForm: FormGroup;
  isInscriptionOwner: boolean;


  ngOnInit(): void {
    

    this.getInscription();
  }

  setAccesibility(){
    this.authService.showUser(this.tokenService.getUsername()).subscribe(
      (data) => {
        this.user = data;
        this.isInscriptionOwner = this.user.id === this.inscription.user;
        if (this.isInscriptionOwner==false && this.isAdmin==false) {
          appUtils.showDanger(this.toastService, 'Usuario incorrecto')
          return appUtils.promiseReload(this.router, '/', 500);
        }

      },
      (err) => { appUtils.showDanger(this.toastService, 'Usuario no logueado') }
    );
  }

  getInscription(): void {
    this.inscriptionService
      .getInscription(Number(this.activatedRoute.snapshot.paramMap.get('id')))
      .subscribe(
        (data) => {
          this.inscription = data;
          this.setAccesibility();
        },
        (err) => {
          appUtils.showDanger(this.toastService, 'Inscripción inexistente')
          appUtils.redirect(this.router, '/cursos');
        }
      );
  }

  deleteInscription() {
    this.inscriptionService.deleteInscription(this.inscription.id).subscribe(
      (data) => {
        appUtils.showSuccess(this.toastService, 'Inscripción eliminada')
        return appUtils.promiseReload(this.router, '/cursos', 2000);
      },
      (err) => {
        appUtils.showDanger(this.toastService, err)
      }
    );
  }

}
