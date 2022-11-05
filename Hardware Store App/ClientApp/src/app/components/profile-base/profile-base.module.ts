import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotAuthenticatedGuard } from '../../guards/notAuthenticated.guard';
import { CredentialsComponent } from './credentials/credentials.component';
import { EditComponent } from './edit/edit.component';
import { OrdersComponent } from './orders/orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { WishlistItemComponent } from './wishlist/wishlist-item/wishlist-item.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewItemComponent } from './reviews/review-item/review-item.component';

@NgModule({
  declarations: [
    CredentialsComponent,
    EditComponent,
    OrdersComponent,
    WishlistComponent,
    WishlistItemComponent,
    ReviewsComponent,
    ReviewItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'Profile', component: CredentialsComponent, canActivate: [NotAuthenticatedGuard],
        children: [
          { path: 'Edit', component: EditComponent },
          { path: 'Orders', component: OrdersComponent },
          { path: 'Wishlist', component: WishlistComponent },
          { path: 'Reviews', component: ReviewsComponent }
        ]
      },
    ])
  ],
  exports: [
    RouterModule,
    CredentialsComponent,
    EditComponent,
    OrdersComponent
  ]
})
export class ProfileBaseModule { }
