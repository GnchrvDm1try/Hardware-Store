import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private route: ActivatedRoute;
  private service: ProductService;
  product: any;
  reviews: any;

  constructor(service: ProductService, route: ActivatedRoute) {
    this.service = service;
    this.route = route;
  }

  ngOnInit(): void {
    this.getProduct();
    this.getReviews();
  }

  getProduct() {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.service.getProduct(productId).subscribe(
      data => this.product = data
    );
  }

  getReviews() {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.service.getReviews(productId).subscribe(
      data => this.reviews = data
    )
  }
}
