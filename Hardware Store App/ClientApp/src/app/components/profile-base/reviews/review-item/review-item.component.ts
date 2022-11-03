import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent implements OnInit {
  @Input() review: any;
  private reviewDateTime: Date | undefined;

  get dateTime() {
    return `${this.reviewDateTime?.getHours().toString().padStart(2, '0')}:${this.reviewDateTime?.getMinutes().toString().padStart(2, '0')}
      ${this.reviewDateTime?.getDate()?.toString()?.padStart(2, '0')}.${this.reviewDateTime?.getMonth()?.toString()?.padStart(2, '0')}.${this.reviewDateTime?.getFullYear()}`;
  }

  constructor() {
  }

  ngOnInit(): void {
    this.reviewDateTime = new Date(this.review.reviewdate)
  }
}
