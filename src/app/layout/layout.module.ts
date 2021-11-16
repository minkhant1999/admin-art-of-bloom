import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NavComponent } from '../shared/nav/nav.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { ProductListComponent } from '../components/product-list/product-list.component';


@NgModule({
  declarations: [
    LayoutComponent,
    NavComponent,
    OrdersComponent,
    AddProductComponent,
    ProductListComponent,

  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LayoutModule { }
