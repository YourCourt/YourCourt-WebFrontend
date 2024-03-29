import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import * as appUtils from 'src/app/appUtils'
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { Product, ProductDto } from 'src/app/models/product';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {


  form: FormGroup;
  image: File;
  product: Product;
  productTypes: string[] = [];
  productTypeSelected: string;
  loading: boolean = false;

  constructor(private productService: ProductService, private imageService: ImageService, private toastService: ToastService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {


  }

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.productTypes
        : this.productTypes.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  ngOnInit(): void {
    this.getProduct();
    this.getProductTypes();
    

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(512)]],
      productType: [this.productTypeSelected, [Validators.required]],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]{1,4}(?:\\.[0-9]{1,2})?$")]],
      bookPrice: ['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]{1,4}(?:\\.[0-9]{1,2})?$")]],
      tax: ['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]{1,4}$")]],
      stock: ['', [Validators.required, Validators.min(0), Validators.pattern("^^[0-9]{1,4}$")]],
    });
  }

  getProduct(): void {
    this.productService.getProductById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(
      data => {
        this.product = data;

        this.form.controls['name'].setValue(data.name);
        this.form.controls['description'].setValue(data.description);
        this.form.controls['productType'].setValue(data.productType.typeName);
        this.productTypeSelected=data.productType.typeName;
        this.form.controls['price'].setValue(data.price);
        this.form.controls['bookPrice'].setValue(data.bookPrice);
        this.form.controls['tax'].setValue(data.tax);
        this.form.controls['stock'].setValue(data.stock);
      },
      err => {
        appUtils.showDanger(this.toastService, 'Producto inexistente')
        appUtils.redirect(this.router, '/productos')
      }
    );
  }

  getProductTypes(): void {
    this.productService.getAllProductTypes().subscribe(
      data => { this.productTypes = data.map(productType => productType.typeName) }, err => { appUtils.showDanger(this.toastService, err); });
  }

  updateProduct(): void {
    let productUpdated = new ProductDto(this.form.value.name, this.form.value.description, this.form.value.productType, this.form.value.price, this.form.value.bookPrice, this.form.value.stock, this.form.value.tax)

    this.productService.updateProduct(this.product.id, productUpdated).subscribe(
      data => {
        if (this.image != undefined) {

          this.imageService.newProductImage(data.id, this.image).subscribe(
            data => { }, errorImage => { appUtils.showErrorMessages(errorImage, this.toastService); 
            });
        }

        this.loading = true;
        appUtils.showSuccess(this.toastService, 'Producto editado')
        return appUtils.promiseReload(this.router, '/productos/' + data.id, 5500)
      },
      err => {
        appUtils.showDanger(this.toastService, err);
      }
    );
  }

  addProductImage(imageFile: FileList, image) {
    const file = imageFile.item(0)
    if (file.size <= 4000000 && file?.type == 'image/jpeg' || file?.type == 'image/png') {
      this.image = file
    } else {
      image.value = undefined
    }
  }


}
