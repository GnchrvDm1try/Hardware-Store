import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CredentialsComponent } from './credentials/credentials.component';
import { EditComponent } from './edit/edit.component';
import { OrderListComponent } from './order-list/order-list.component';
import { NotAuthenticatedGuard } from '../../guards/notAuthenticated.guard';

@NgModule({
  declarations: [
    CredentialsComponent,
    EditComponent,
    OrderListComponent
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
          { path: 'Orders', component: OrderListComponent }
        ]
      },
    ])
  ],
  exports: [
    RouterModule,
    CredentialsComponent,
    EditComponent,
    OrderListComponent
  ]
})
export class ProfileBaseModule { }
