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
  selector: 'app-course-show',
  templateUrl: './course-show.component.html',
  styleUrls: ['./course-show.component.css']
})
export class CourseShowComponent implements OnInit {

  constructor(
    private courseService: CourseService,
    private inscriptionService: InscriptionService,
    private tokenService: TokenService,
    private toastService: ToastService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  course: Course;
  inscriptions:Inscription[];

  userId: number;
  user: User;
  loading: boolean;

  isAdmin: boolean = appUtils.isAdminUser(this.tokenService)

  inscriptionForm: FormGroup;
  // alreadyInscripted: boolean;
  today:Date;

  ngOnInit(): void {

    this.authService.showUser(this.tokenService.getUsername()).subscribe(
      (data) => {
        this.userId = data.id;
        this.user = data;
        // this.inscriptionService.getAllInscriptionsByUsername(data.username).subscribe(
        //   (allInscriptionsByUsername) => {
        //     this.alreadyInscripted = allInscriptionsByUsername.some(
        //       (inscription: Inscription) => inscription.course.id == this.course.id
        //     )
        //   },

        // );
      },
      (err) => { appUtils.showDanger(this.toastService, 'Acceda para inscribirse') }
    );

    this.getCourse();
  }

  getCourse(): void {
    this.today = new Date();
    this.courseService
      .getCourse(Number(this.activatedRoute.snapshot.paramMap.get('id')))
      .subscribe(
        (data) => {
          this.course = data;
          this.course.startDate=new Date(data.startDate);
          this.course.endDate=new Date(data.endDate);

          if(this.isAdmin){
            this.getInscriptions();
          }
        },
        (err) => {
          appUtils.showDanger(this.toastService, 'Curso inexistente')
          appUtils.redirect(this.router, '/cursos');
        }
      );
  }

  deleteCourse() {
    this.courseService.deleteCourse(this.course.id).subscribe(
      (data) => {
        appUtils.showSuccess(this.toastService, 'Curso eliminado')
        return appUtils.promiseReload(this.router, '/cursos/', 2000);
      },
      (err) => {
        appUtils.showDanger(this.toastService, err)
      }
    );
  }



  openScrollableContent(longContent) {
    this.inscriptionForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      surnames: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      observations: ['', [Validators.required, Validators.maxLength(512)]],
    })
    this.modalService.open(longContent, { scrollable: true, size: 'm' });
  }

  onInscriptionCreate() {
    let inscriptionCreated = new Inscription(this.inscriptionForm.value.name, this.inscriptionForm.value.surnames, this.user.email, this.user.phone, this.inscriptionForm.value.observations)

    this.inscriptionService.createInscription(inscriptionCreated, this.course.id).subscribe(
      data => {

        this.loading = true;
        appUtils.showSuccess(this.toastService, 'Inscripción creada')
        return appUtils.promiseReload(this.router, '/inscripciones/' + data.id, 2500)
      },
      err => {
        appUtils.showErrorMessages(err,this.toastService);
      }
    );
  }

  getInscriptions(){
    this.inscriptionService.getAllInscriptionsByCourse(this.course.id).subscribe(
      data => {

        this.inscriptions=data;
      },
      err => {
        appUtils.showErrorMessages(err,this.toastService);
      }
    );
  }


}


