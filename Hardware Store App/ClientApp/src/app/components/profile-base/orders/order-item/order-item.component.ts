import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OrderStatuses } from '../../../../models/enums/order-statuses'
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
  animations: [
    trigger('rotatedState', [
      state('false', style({ transform: 'rotate(0)' })),
      state('true', style({ transform: 'rotate(-180deg)' })),
      transition('false => true', animate('300ms ease-in')),
      transition('true => false', animate('200ms ease-out'))
    ])
  ]
})
export class OrderItemComponent implements OnInit {
  @Input() order: any;
  private readonly userService: UserService;
  private readonly formBuilder: FormBuilder;
  date: Date = new Date();
  form!: FormGroup;
  statusColorStyle: string = '';
  isExpanded: boolean = false;
  isEditing: boolean = false;
  isAllowedToEdit = false;

  get totalPrice() {
    let result = 0;
    this.order.orderproducts.forEach((item: any) => result += item.price);
    return result;
  }

  constructor(userService: UserService, formBuilder: FormBuilder) {
    this.userService = userService;
    this.formBuilder = formBuilder;
  }

  ngOnInit(): void {
    this.date = new Date(this.order.orderdate);
    this.form = this.getFormGroupInstance();
    this.applyStatusColor();
    if (this.order.statusid !== OrderStatuses.Completed && this.order.statusid !== OrderStatuses.Canceled && this.order.statusid !== OrderStatuses.Returned)
      this.isAllowedToEdit = true;
  }

  saveChanges() {
    this.userService.updateOrder(this.form).subscribe(() => {
      this.order.address = this.form.get('address')?.value;
      this.isEditing = false;
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) this.form.get('address')?.setValue(this.order.address);
  }

  discard() {
    if (confirm('Are you sure?')) {
      this.form.get('statusid')?.setValue(OrderStatuses.Canceled);
      this.form.get('address')?.setValue(this.order.address);
      this.userService.updateOrder(this.form).subscribe(() => {
        this.order.status.title = OrderStatuses[OrderStatuses.Canceled];
        this.applyStatusColor();
        this.isAllowedToEdit = false;
        this.isEditing = false;
      });
    }
  }

  private getFormGroupInstance() {
    let editForm: FormGroup;
    editForm = this.formBuilder.group({
      id: new FormControl(this.order.id),
      address: new FormControl(this.order.address, [Validators.required, Validators.minLength(7), Validators.maxLength(200)]),
      statusid: new FormControl(0)
    });
    return editForm;
  }

  private applyStatusColor() {
    if (this.order.status.title === OrderStatuses[OrderStatuses.Completed])
      this.statusColorStyle = 'bg-green-500';
    else if (this.order.status.title === OrderStatuses[OrderStatuses.Canceled] || this.order.status.title === OrderStatuses[OrderStatuses.Returned])
      this.statusColorStyle = 'bg-red-500';
    else
      this.statusColorStyle = 'bg-yellow-400';
  }
}
