import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() order: any;
  date: Date = new Date();
  isExpanded: boolean = false;

  get totalPrice() {
    let result = 0;
    this.order.orderproducts.forEach((item: any) => result += item.price)
    return result;
  }

  constructor() {
  }

  ngOnInit(): void {
    this.date = new Date(this.order.orderdate);
  }
}
