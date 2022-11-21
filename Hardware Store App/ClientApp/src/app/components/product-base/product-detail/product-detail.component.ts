import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from '../../../services/product.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private readonly route: ActivatedRoute;
  private readonly productService: ProductService;
  private readonly userService: UserService;
  private readonly authService: AuthService;
  isInWishlist: boolean = false;
  product: any;
  reviews: any;

  get isUserAuthenticated() {
    return this.authService.isUserAuthenticated();
  }

  constructor(route: ActivatedRoute, productService: ProductService, userService: UserService, authService: AuthService) {
    this.route = route;
    this.productService = productService;
    this.userService = userService;
    this.authService = authService;
  }

  ngOnInit(): void {
    this.getProduct();
    this.getReviews();
  }

  getProduct() {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(productId).subscribe(data => {
      this.product = data;
      if (this.isUserAuthenticated)
        this.checkIfInWishlist();
    });
  }

  getReviews() {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getReviews(productId).subscribe(data => this.reviews = data);
  }

  checkIfInWishlist() {
    this.userService.currentUser.subscribe(user => {
      if (this.findProductInWishlist(user.wishlists.sort((a: any, b: any) => a.productid - b.productid), this.product.id) !== -1)
        this.isInWishlist = true;
    })
  }

  toggleWishlistItem() {
    this.userService.toggleWishlistItem(this.product.id as number).subscribe(() => this.isInWishlist = !this.isInWishlist);
  }

  private findProductInWishlist(wishlist: any[], target: number) {
    let leftBoundary: number = 0;
    let rigthBoundary: number = wishlist.length - 1;

    while (leftBoundary <= rigthBoundary) {
      const indexOfArrayMiddle: number = Math.trunc((leftBoundary + rigthBoundary) / 2);

      if (wishlist[indexOfArrayMiddle].productid === target) return indexOfArrayMiddle;

      if (target < wishlist[indexOfArrayMiddle].productid) rigthBoundary = indexOfArrayMiddle - 1;
      else leftBoundary = indexOfArrayMiddle + 1;
    }
    return -1;
  }
}
