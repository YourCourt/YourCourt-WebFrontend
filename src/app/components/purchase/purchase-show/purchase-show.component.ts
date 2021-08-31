import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';
import { TokenService } from 'src/app/services/token.service';
import * as appUtils from 'src/app/appUtils';
import { Product } from 'src/app/models/product';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Purchase } from 'src/app/models/purchase';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-purchase-show',
  templateUrl: './purchase-show.component.html',
  styleUrls: ['./purchase-show.component.css']
})
export class PurchaseShowComponent implements OnInit {

  purchase: Purchase;

  isAdmin: boolean;
  user: User;
  purchaseUser: User;
  isPurchaseOwner: boolean;
  lines: Array<{
    product: Product;
    quantity: number;
    discount: number;
  }> = [];

  constructor(private productService: ProductService,
    private purchaseService: PurchaseService,
    private tokenService: TokenService,
    private toastService: ToastService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.isAdmin = appUtils.isAdminUser(this.tokenService)
  }

  ngOnInit(): void {
    this.getPurchase();
  }

  setAccesibility() {
    this.authService.showUser(this.tokenService.getUsername()).subscribe(
      (data) => {
        this.user = data;

        this.isPurchaseOwner = this.user.id === this.purchase.user;

        if (this.isPurchaseOwner == false && this.isAdmin == false) {
          appUtils.showDanger(this.toastService, 'Usuario incorrecto')
          return appUtils.promiseReload(this.router, '/productos/', 500);
        }
      },
      (err) => {
        appUtils.showDanger(this.toastService, 'Usuario incorrecto');
        return appUtils.promiseReload(this.router, '/productos/', 500);
      }
    );
  }

  setPurchaseUser() {
    this.authService
      .showUserById(this.purchase.user)
      .subscribe((data) => {
        this.purchaseUser = data;
      });
  }

  getPurchase(): void {
    this.purchaseService
      .getPurchase(Number(this.activatedRoute.snapshot.paramMap.get('id')))
      .subscribe(
        (data) => {
          this.purchase = data;
          this.setAccesibility();
          this.setPurchaseUser();

          for (let line of this.purchase.lines) {
            this.productService
              .getProductById(line.productId)
              .subscribe((product) => {
                let lineWithProduct: {
                  product: Product;
                  quantity: number;
                  discount: number;
                } = {
                  'product': product,
                  'quantity': line.quantity,
                  'discount': line.discount,
                };
                this.lines.push(lineWithProduct);
              });
          }
        },
        (err) => {
          appUtils.showErrorMessages(err,this.toastService);
          appUtils.redirect(this.router, '/productos');
        }
      );
  }

  deletePurchase() {
    this.purchaseService.deletePurchase(this.purchase.id).subscribe(
      (data) => {
        appUtils.showSuccess(this.toastService, 'Compra eliminada');
        return appUtils.promiseReload(this.router, '/productos/', 2000);
      },
      (err) => {
        appUtils.showDanger(this.toastService, err);
      }
    );
  }





}
