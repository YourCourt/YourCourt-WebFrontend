import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductType } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  
  courses: Course[];

  isAdmin:boolean=appUtils.isAdminUser(this.tokenService)
  gridColumns = 3;
  constructor(private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    public toastService: ToastService) {
    
   }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }


}
