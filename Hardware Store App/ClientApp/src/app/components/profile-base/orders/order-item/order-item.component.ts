import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() order: any;
  date: Date = new Date();

  constructor() {
  }

  ngOnInit(): void {
    this.date = new Date(this.order.orderdate);
  }
}
