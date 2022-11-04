import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  private readonly formBuilder: FormBuilder;
  private reviewDateTime: Date | undefined;
  form!: FormGroup;
  isEditing: boolean = false;
  estimation: number = 1;

  get dateTime() {
    return `${this.reviewDateTime?.getHours().toString().padStart(2, '0')}:${this.reviewDateTime?.getMinutes().toString().padStart(2, '0')}
      ${this.reviewDateTime?.getDate()?.toString()?.padStart(2, '0')}.${this.reviewDateTime?.getMonth()?.toString()?.padStart(2, '0')}.${this.reviewDateTime?.getFullYear()}`;
  }

  constructor(reviewService: ReviewService, formBuilder: FormBuilder) {
    this.reviewService = reviewService;
    this.formBuilder = formBuilder;
  }

  ngOnInit(): void {
    this.reviewDateTime = new Date(this.review.reviewdate);
    this.form = this.getFormGroupInstance();
    this.estimation = this.review.estimation;
  }

  removeReview() {
    this.reviewService.delete(this.review.id).subscribe(() => this.removeEvent.emit());
  }

  changeEstimation(index: number) {
    this.estimation = index + 1;
  }

  private getFormGroupInstance() {
    let editForm: FormGroup;
    editForm = this.formBuilder.group({
      comment: new FormControl(this.review.comment, [Validators.required, Validators.maxLength(5000)]),
      estimation: new FormControl(Math.round(this.review.estimation), [Validators.required]),
      userId: new FormControl(this.review.userid),
      productId: new FormControl(this.review.productid),
      id: new FormControl(this.review.id)
    });
    return editForm;
  }
}
