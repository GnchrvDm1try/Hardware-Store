import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent implements OnInit {
  @Input() review: any;
  @Output() removeEvent: any = new EventEmitter<any>();
  private readonly reviewService: ReviewService;
  private reviewDateTime: Date | undefined;

  get dateTime() {
    return `${this.reviewDateTime?.getHours().toString().padStart(2, '0')}:${this.reviewDateTime?.getMinutes().toString().padStart(2, '0')}
      ${this.reviewDateTime?.getDate()?.toString()?.padStart(2, '0')}.${this.reviewDateTime?.getMonth()?.toString()?.padStart(2, '0')}.${this.reviewDateTime?.getFullYear()}`;
  }

  constructor(reviewService: ReviewService) {
    this.reviewService = reviewService;
  }

  ngOnInit(): void {
    this.reviewDateTime = new Date(this.review.reviewdate)
  }

  removeReview() {
    this.reviewService.delete(this.review.id).subscribe(() => this.removeEvent.emit());
  }
}
