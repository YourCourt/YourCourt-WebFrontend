import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';
@Component({
  selector: 'app-news-show',
  templateUrl: './news-show.component.html',
  styleUrls: ['./news-show.component.css']
})
export class NewsShowComponent implements OnInit {

  
  news:News;

  isAdmin:boolean=appUtils.isAdminUser(this.tokenService)
  constructor(private newsService: NewsService,
    private tokenService: TokenService,
    private toastService: ToastService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getNews();
  }


  getNews(): void {
    this.newsService
      .getNews(Number(this.activatedRoute.snapshot.paramMap.get('id')))
      .subscribe(
        (data) => {
          this.news = data;
        },
        (err) => {
          appUtils.showDanger(this.toastService,'Noticia inexistente')
          appUtils.redirect(this.router, '/noticias');
        }
      );
  }

  deleteNews() {
    this.newsService.deleteNews(this.news.id).subscribe(
      (data) => {
        appUtils.showSuccess(this.toastService,'Noticia eliminada')
        return appUtils.promiseReload(this.router, '/noticias/', 2000);
      },
      (err) => {
        appUtils.showDanger(this.toastService, err)
      }
    );
  }

}
