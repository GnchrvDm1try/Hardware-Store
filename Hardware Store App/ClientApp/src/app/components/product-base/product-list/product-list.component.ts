import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private service: ProductService;

  products: any;

  constructor(service: ProductService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.service.getProducts()
      .subscribe(response => {
        this.products = response;
      });
  }

}
