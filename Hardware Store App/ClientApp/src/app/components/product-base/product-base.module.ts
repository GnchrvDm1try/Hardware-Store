import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'Products', component: ProductListComponent },
      { path: 'Products/Details/:id', component: ProductDetailComponent }
    ])
  ],
  exports: [
    ProductComponent,
    ProductListComponent
  ]
})
export class ProductBaseModule { }
