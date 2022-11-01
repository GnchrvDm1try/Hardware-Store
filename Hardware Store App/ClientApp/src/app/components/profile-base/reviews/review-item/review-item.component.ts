import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent implements OnInit {
  @Input() review: any;

  constructor() {
  }

  ngOnInit(): void {
  }
}
