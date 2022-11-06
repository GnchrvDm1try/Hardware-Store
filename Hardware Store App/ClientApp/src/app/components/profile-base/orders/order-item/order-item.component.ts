import { Component, Input, OnInit } from '@angular/core';
import { OrderStatuses } from '../../../../models/enums/order-statuses'

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() order: any;
  date: Date = new Date();
  isExpanded: boolean = false;
  statusColorStyle: string = '';

  get totalPrice() {
    let result = 0;
    this.order.orderproducts.forEach((item: any) => result += item.price)
    return result;
  }

  constructor() {
  }

  ngOnInit(): void {
    this.date = new Date(this.order.orderdate);
    this.applyStatusColor();
  }

  applyStatusColor() {
    if (this.order.status.title === OrderStatuses.Completed)
      this.statusColorStyle += 'bg-green-500';
    else if (this.order.status.title === OrderStatuses.Canceled)
      this.statusColorStyle += 'bg-red-500';
    else
      this.statusColorStyle += 'bg-yellow-400';
  }
}
