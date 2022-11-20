import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  ngOnInit(): void {
    if (this.products) {
      this.getProducts();
    }
  }

  getProducts() {
    this.productService.getProducts().subscribe(response => this.products = response);
  }
}
