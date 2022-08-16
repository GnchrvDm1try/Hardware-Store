import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, Product {

  private service: ProductService;

  @Input() id: number = 0;
  @Input() name: string = "";
  @Input() description: string = "";
  @Input() price: number = 0;
  @Input() rating: number = 0;
  @Input() categoryId: number = 0;
  @Input() manufacturerId: number = 0;
  @Input() countryProducerId: number = 0;

  roundedRating: number = 0;

  constructor(service: ProductService) {
    this.service = service;
  }
  
  ngOnInit(): void {
    this.roundedRating = Math.round(this.rating);
  }
}
