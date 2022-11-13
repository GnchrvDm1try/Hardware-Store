import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  @Output() removeEvent = new EventEmitter<any>();
  private readonly userService: UserService;
  readonly url: string;

  get additionDate(): Date {
    return new Date(this.product.additiondate);
  }

  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.url = router.url.split('/')[2];
  }

  ngOnInit(): void {
  }

  removeWishlistItem() {
    this.userService.toggleWishlistItem(this.product.productid).subscribe(() => this.removeEvent.emit());
  }
}
