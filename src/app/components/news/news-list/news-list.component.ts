import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastService } from 'src/app/services/toast.service';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  news: News[];
  isAdmin:boolean=appUtils.isAdminUser(this.tokenService)

  gridColumns = 3;

  constructor(private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    public toastService: ToastService) {

   }

  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews() {
    this.newsService.getAllNews().subscribe(
      (data) => {
        this.news = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
