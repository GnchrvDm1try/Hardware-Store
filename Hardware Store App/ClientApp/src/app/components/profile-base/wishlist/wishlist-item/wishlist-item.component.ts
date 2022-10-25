import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.css']
})
export class WishlistItemComponent implements OnInit {
  @Input() product: any;
  @Output() removeEvent = new EventEmitter<any>();
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
  }

  removeWishlistItem() {
    this.userService.toggleWishlistItem(this.product.productid).subscribe(() => this.removeEvent.emit());
  }
}
