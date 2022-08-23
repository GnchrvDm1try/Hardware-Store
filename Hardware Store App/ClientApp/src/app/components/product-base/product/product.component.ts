import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private service: ProductService;

  @Input() product: Product | undefined;

  constructor(service: ProductService) {
    this.service = service;
  }
  
  ngOnInit(): void {
  }
}
