import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  private readonly userService: UserService;

  reviews: any;

  constructor(userService: UserService) {
    this.userService = userService;
    this.userService.currentUser.subscribe(user => this.reviews = user.reviews);
  }

  ngOnInit(): void {
  }
  
  remove(id: number) {
    this.reviews = this.reviews.filter((item: any) => item.id !== id);
  }
}
