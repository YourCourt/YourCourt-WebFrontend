import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils';
import { Product } from 'src/app/models/product';

const CART_KEY = 'CartProducts';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css']
})
export class ProductShowComponent implements OnInit {

  product: Product;

  isAdmin: boolean = appUtils.isAdminUser(this.tokenService)
  isLogged: boolean = this.tokenService.getToken() != null;

  lowStock: number = appUtils.LOW_STOCK;

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
          appUtils.showDanger(this.toastService, 'Producto inexistente');
          appUtils.redirect(this.router, '/productos');
        }
      );
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id).subscribe(
      (data) => {
        appUtils.showSuccess(this.toastService, 'Producto eliminado');
        return appUtils.promiseReload(this.router, '/productos/', 2000);
      },
      (err) => {
        appUtils.showDanger(this.toastService, err);
      }
    );
  }

  addToCart(id: number, name: string, price: number, stock: number) {
    let products: Array<{ id: number; name: string; price: number; stock: number }> = [];
    let product: { id: number; name: string; price: number; stock: number } = { id: id, name: name, price: price, stock: stock }
    if (localStorage.getItem(CART_KEY)) {
      JSON.parse(localStorage.getItem(CART_KEY) || '{}').forEach(adfcx => {
        products.push(adfcx);
      });
      if (products.some(p => p.id === id)) {
        appUtils.showDanger(this.toastService, "El producto ya se encuentra en el carrito");
      } else if (products.length >= appUtils.MAXIMUM_CART_SIZE) {
        appUtils.showDanger(this.toastService, "Solo se permiten " + appUtils.MAXIMUM_CART_SIZE + " productos en el carrito");
      } else {
        products.push(product);
        localStorage.setItem(CART_KEY, JSON.stringify(products));
        appUtils.showSuccess(this.toastService, 'Producto añadido al carrito');
      }
    } else {
      products.push(product);
      localStorage.setItem(CART_KEY, JSON.stringify(products));
      appUtils.showSuccess(this.toastService, 'Producto añadido al carrito');

    }
  }
}
