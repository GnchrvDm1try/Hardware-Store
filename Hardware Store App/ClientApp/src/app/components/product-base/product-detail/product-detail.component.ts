import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  isInWishlist: boolean = false;
  product: any;
  reviews: any;

  constructor(route: ActivatedRoute, productService: ProductService, userService: UserService) {
    this.route = route;
    this.productService = productService;
    this.userService = userService;
  }

  ngOnInit(): void {
    this.getProduct();
    this.getReviews();
  }

  getProduct() {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(productId).subscribe(data => {
      this.product = data;
      this.checkIfInWishlist();
    });
  }

  getReviews() {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getReviews(productId).subscribe(data => this.reviews = data);
  }

  checkIfInWishlist() {
    this.userService.currentUser.subscribe(user => {
      for (let i = 0; i < user.wishlists.length; i++)
        if (user.wishlists[i].productid == this.product.id) { this.isInWishlist = true; break }
    });
  }

  toggleWishlistItem() {
    this.userService.toggleWishlistItem(this.product.id as number).subscribe(() => this.isInWishlist = !this.isInWishlist);
  }
}
