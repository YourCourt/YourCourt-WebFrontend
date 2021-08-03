import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import * as appUtils from 'src/app/appUtils'

const FORMSPREE_URI = "https://formspree.io/f/mqkwydad"
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private toastService: ToastService, private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(512)]],
    })
  }

  form: FormGroup
  loading: boolean = false;

  ngOnInit(): void {

  }

  onPost() {
    if (this.form.status == "VALID") {
      this.form.disable(); // disable the form if it's valid to disable multiple submissions
      var formData: any = new FormData();
      formData.append("name", this.form.get("name").value);
      formData.append("email", this.form.get("email").value);
      formData.append("message", this.form.get("message").value);


      this.http.post(FORMSPREE_URI, formData).subscribe(
        async (response) => {
          // choose the response message
          if (response["ok"] == true) {
            this.loading = true;
            await new Promise(f => setTimeout(f, 1000));
            appUtils.showSuccess(this.toastService, 'Mensaje enviado')

          } else {
            appUtils.showDanger(this.toastService, 'Algo fue mal, intentelo de nuevo')
          }
          this.form.enable(); // re enable the form after a success
          this.loading = false;
        },
        (error) => {
          this.form.enable();
          appUtils.showDanger(this.toastService, error)
        }
      );
    }

  }
}
