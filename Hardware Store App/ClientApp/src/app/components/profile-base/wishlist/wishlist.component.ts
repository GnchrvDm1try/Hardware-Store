import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  private readonly userService: UserService;
  products: any;

  constructor(userService: UserService) {
    this.userService = userService; 
    this.userService.currentUser.subscribe(user => this.products = user.wishlists);
  }

  ngOnInit(): void {
  }

  remove(id: number) {
    this.products = this.products.filter((item: any) => item.productid !== id);
  }
}
