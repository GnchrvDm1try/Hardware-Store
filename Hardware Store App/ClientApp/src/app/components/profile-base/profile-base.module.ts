import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialsComponent } from './credentials/credentials.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderListComponent } from './order-list/order-list.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    CredentialsComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    CredentialsComponent,
    OrderListComponent
  ]
})
export class ProfileBaseModule { }
