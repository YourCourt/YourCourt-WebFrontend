import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';
import * as appUtils from 'src/app/appUtils'
import { ImageService } from 'src/app/services/image.service';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-news-update',
  templateUrl: './news-update.component.html',
  styleUrls: ['./news-update.component.css']
})
export class NewsUpdateComponent implements OnInit {

  form: FormGroup;
  image: File
  loading: boolean = false;
  news: News;

  constructor(private newsService: NewsService, private imageService: ImageService, private toastService: ToastService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getNews();
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(512)]],
    })
  }

  getNews(): void {
    this.newsService.getNews(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(
      data => {
        this.news = data;

        this.form.controls['name'].setValue(data.name);
        this.form.controls['description'].setValue(data.description);
      },
      err => {
        appUtils.showDanger(this.toastService, 'Noticia inexistente')
        appUtils.redirect(this.router, '/noticias')
      }
    );
  }

  updateNews(): void {
    let newsUpdate = new News(this.form.value.name, this.form.value.description)

    this.newsService.updateNews(newsUpdate, this.news.id).subscribe(
      data => {
        if (this.image != undefined) {

          this.imageService.newNewsImage(data.id, this.image).subscribe(
            data => { }, errorImage => { appUtils.showErrorMessages(errorImage, this.toastService) });
        }
        this.loading = true;
        appUtils.showSuccess(this.toastService, 'Noticia actualizada')
        return appUtils.promiseReload(this.router, '/noticias/' + data.id, 5500)
      },
      err => {
        appUtils.showDanger(this.toastService, err);
      }
    );
  }

  addNewsImage(imageFile: FileList, image) {
    const file = imageFile.item(0)
    if (file.size <= 4000000 && file?.type == 'image/jpeg' || file?.type == 'image/png') {
      this.image = file
    } else {
      image.value = undefined
    }
  }

}
