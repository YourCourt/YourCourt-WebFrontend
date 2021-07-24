import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductType } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  formSearch: FormGroup;
  products: Product[];
  productTypes: ProductType[];

  isAdmin:boolean=appUtils.isAdminUser(this.tokenService)

  constructor(private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    public toastService: ToastService) {
    this.formSearch = formBuilder.group({
      productType: ['', Validators.required],
    });
   }

  ngOnInit(): void {
    this.getAllProductTypes();
  }

  getAllProductTypes() {
    this.productService.getAllProductTypes().subscribe(
      (data) => {
        this.productTypes = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSearch() {
    this.getAllProductsByProductType(this.formSearch.value.productType);
  }

  getAllProductsByProductType(typeName: string) {
    this.productService.getProductsByTypeName(typeName).subscribe(
      (data) => {
        this.products = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
