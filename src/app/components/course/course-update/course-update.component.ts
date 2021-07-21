import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourtService } from 'src/app/services/court.service';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils'
import { Court } from 'src/app/models/court';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from 'src/app/services/image.service';
import { ToastService } from 'src/app/services/toast.service';
import { Course, Inscription } from 'src/app/models/course';
import { InscriptionService } from 'src/app/services/inscription.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.css']
})
export class CourseUpdateComponent implements OnInit {


  constructor(private courseService: CourseService, private authService: AuthService, private tokenService: TokenService, private toastService: ToastService, private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }


  course: Course;
  user: User;
  form: FormGroup

  loading: boolean = false;
  isCourseOwner: boolean;
  isAdmin: boolean = appUtils.isAdminUser(this.tokenService)

  ngOnInit(): void {
    this.getCourse()
  }

  getCourse(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(512)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    })
    this.courseService.getCourse(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(
      data => {
        this.course = data;

        this.form.controls['title'].setValue(data.title);
        this.form.controls['description'].setValue(data.description);
        this.form.controls['startDate'].setValue(data.startDate);
        this.form.controls['endDate'].setValue(data.endDate);

        this.authService.showUser(this.tokenService.getUsername()).subscribe(
          (data) => {
            this.user = data;
            this.isCourseOwner = this.user.username === this.tokenService.getUsername();
            if (!this.isCourseOwner && !this.isAdmin) {
              appUtils.showDanger(this.toastService, 'Usuario incorrecto')
              return appUtils.promiseReload(this.router, '/', 500);
            }


          },
          (err) => { appUtils.showDanger(this.toastService, 'Usuario no logueado') }
        );


      },
      err => {
        appUtils.showDanger(this.toastService, 'Inscripción inexistente')
        appUtils.redirect(this.router, '/cursos')
      }
    );
  }

  updateCourse(): void {
    let courseUpdated = new Course(this.form.value.title, this.form.value.description, this.form.value.startDate, this.form.value.endDate)
    this.courseService.updateCourse(courseUpdated, this.course.id).subscribe(
      data => {

        this.loading = true;
        appUtils.showSuccess(this.toastService, 'Curso actualizado')
        return appUtils.promiseReload(this.router, '/cursos/' + data.id, 2500)
      },
      err => {
        appUtils.showErrorMessaages(err,this.toastService);
      }
    );
  }

}
