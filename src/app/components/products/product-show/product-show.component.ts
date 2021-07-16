import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css']
})
export class ProductShowComponent implements OnInit {

  product:Product;

  isAdmin:boolean=appUtils.isAdminUser(this.tokenService)
  constructor(private productService: ProductService,
    private tokenService: TokenService,
    private toastService: ToastService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getProduct();
  }


  getProduct(): void {
    this.productService
      .getProductById(Number(this.activatedRoute.snapshot.paramMap.get('id')))
      .subscribe(
        (data) => {
          this.product = data;
        },
        (err) => {
          appUtils.showDanger(this.toastService,'Producto inexistente')
          appUtils.redirect(this.router, '/productos');
        }
      );
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id).subscribe(
      (data) => {
        appUtils.showSuccess(this.toastService,'Producto eliminado')
        return appUtils.promiseReload(this.router, '/productos/', 2000);
      },
      (err) => {
        appUtils.showDanger(this.toastService, err)
      }
    );
  }
}
