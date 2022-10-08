import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
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
