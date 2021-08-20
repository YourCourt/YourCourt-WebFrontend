import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils';
import { News, Comment } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
@Component({
  selector: 'app-news-show',
  templateUrl: './news-show.component.html',
  styleUrls: ['./news-show.component.css']
})
export class NewsShowComponent implements OnInit {

  
  news:News;
  userId:number;

  isAdmin:boolean=appUtils.isAdminUser(this.tokenService);
  alreadyCommented:boolean;

  commentForm: FormGroup;
  loading:boolean;

  constructor(private newsService: NewsService,
    private tokenService: TokenService,
    private toastService: ToastService,
    private authService: AuthService,
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getNews();
  }

  setAccesibility() {
    if(this.tokenService.getUsername()){
    this.authService.showUser(this.tokenService.getUsername()).subscribe(
      (data) => {
        this.userId = data.id;
        this.alreadyCommented = this.news.comments.some(
          (comment: Comment) => comment.user.id == this.userId
        )
      },
      (err) => {
      }
    );
    }else{
      this.userId = undefined;
    }
  }


  getNews(): void {
    this.newsService
      .getNews(Number(this.activatedRoute.snapshot.paramMap.get('id')))
      .subscribe(
        (data) => {
          this.news = data;
          this.setAccesibility();
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

  openScrollableContent(longContent) {
    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]]
    })
    this.modalService.open(longContent, { scrollable: true, size: 'm' });
  }

  onCommentCreate() {
    let commentCreated = new Comment(this.commentForm.value.content,this.news.id)

    this.commentService.createComment(commentCreated).subscribe(
      data => {

        this.loading = true;
        appUtils.showSuccess(this.toastService, 'Comentario creado')
        return appUtils.promiseReload(this.router, '/noticias/' + this.news.id, 1000)
      },
      err => {
        appUtils.showDanger(this.toastService, err);
      }
    );
  }

  deleteComment(id:number) {
    this.commentService.deleteComment(id).subscribe(
      (data) => {
        appUtils.showSuccess(this.toastService, 'Comentario eliminado')
        return appUtils.promiseReload(this.router, '/noticias/' + this.news.id, 1000)
      },
      (err) => {
        appUtils.showErrorMessages(err,this.toastService)
      }
    );
  }

}
