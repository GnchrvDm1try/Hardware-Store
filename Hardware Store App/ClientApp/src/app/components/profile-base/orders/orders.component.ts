import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  private readonly userService: UserService;
  orders: any;

  constructor(userService: UserService) {
    this.userService = userService;
    this.userService.currentUser.subscribe(user => this.orders = user.orders);
  }

  ngOnInit(): void {
  }

  orderDate(order: any): string[] {
    return order.orderdate.split('T')[0].split('-');
  }

  orderTotalPrice(order: any) {
    let result = 0;
    order.orderproducts.forEach((item: any) => result += item.price)
    return result;
  }
}
