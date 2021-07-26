import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { ToastService } from 'src/app/services/toast.service';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils';
import { Line, PurchaseDto } from 'src/app/models/purchase';
import { AuthService } from 'src/app/services/auth.service';

const CART_KEY = 'CartProducts';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: FormArray = new FormArray([]);
  cartProductsLocalStorage: Array<{ id: number; name: string; price: number; stock:number }> = [];
  lowStock: number = appUtils.LOW_STOCK;

  userId: number;
  loading: boolean = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private purchaseService: PurchaseService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getProductsFromCart();

    this.authService.showUser(this.tokenService.getUsername()).subscribe(
      (data) => {
        this.userId = data.id;

      },
      (err) => {
        appUtils.showDanger(this.toastService, 'Usuario incorrecto');
        return appUtils.promiseReload(this.router, '/', 500);
      }
    );
  }

  getProductsFromCart() {
    if (localStorage.getItem(CART_KEY)) {
      JSON.parse(localStorage.getItem(CART_KEY) || '{}').forEach(adfcx => {
        const control = new FormControl(
          { item: adfcx, quantity: 1 },
          Validators.required
        );
        this.cartProducts.push(control);
        this.cartProductsLocalStorage.push(adfcx);
      });
    } else {
      appUtils.showDanger(this.toastService, 'El carrito se encuentra vacío')
    }
  }

  removeProduct(product: { item: { id: number; name: string; price: number; stock:number }; quantity: number }) {
    // Update form
    let found: AbstractControl = this.cartProducts.controls.find(
      (control) => control.value === product
    );
    let foundIndex = this.cartProducts.controls.indexOf(found);
    this.cartProducts.removeAt(foundIndex);

    //Update localStorage
    let foundIndexLocalStorage = this.cartProductsLocalStorage.findIndex((obj) => obj === product.item)
    this.cartProductsLocalStorage.splice(foundIndexLocalStorage, 1)
    localStorage.setItem(CART_KEY, JSON.stringify(this.cartProductsLocalStorage));

    appUtils.showSuccess(this.toastService, 'Producto eliminado');
    
    if(this.cartProducts.length<1){
      appUtils.showDanger(this.toastService, 'El carrito se encuentra vacío')
    }
  }

  getPurchaseLines() {
    let lines: Array<Line> = [];
    let discount: number = 0;
    for (let product of this.cartProducts.value) {
      lines.push(
        new Line(discount, product.quantity, product.item.id)
      );
    }
    return lines;
  }

  createPurchase() {
    let purchaseCreated = new PurchaseDto(
      this.userId,
      this.getPurchaseLines()
    );

    this.purchaseService.createPurchase(purchaseCreated).subscribe(
      (data) => {
        this.loading = true;
        appUtils.showSuccess(this.toastService, 'Compra creada');
        localStorage.removeItem(CART_KEY);
        return appUtils.promiseReload(
          this.router,
          '/compras/' + data.id,
          3000
        );
      },
      (err) => {
        appUtils.showErrorMessages(err,this.toastService);
      }
    );
  }

}