import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrderListComponent } from './order-list/order-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { EditComponent } from './edit/edit.component';
import { CredentialsComponent } from './credentials/credentials.component';

@NgModule({
  declarations: [
    CredentialsComponent,
    EditComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    CredentialsComponent,
    EditComponent,
    OrderListComponent
  ]
})
export class ProfileBaseModule { }
