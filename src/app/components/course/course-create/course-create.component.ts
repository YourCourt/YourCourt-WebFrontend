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
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  constructor(private courseService: CourseService, private authService: AuthService, private tokenService: TokenService, private toastService: ToastService, private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  form: FormGroup
  loading: boolean = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(512)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    })
  }

  createCourse(): void {
    let courseCreated = new Course(this.form.value.title, this.form.value.description, this.form.value.startDate, this.form.value.endDate)
    this.courseService.createCourse(courseCreated).subscribe(
      data => {

        this.loading = true;
        appUtils.showSuccess(this.toastService, 'Curso creado')
        return appUtils.promiseReload(this.router, '/cursos/' + data.id, 2500)
      },
      err => {
        appUtils.showErrorMessages(err,this.toastService);
      }
    );
  }

}
