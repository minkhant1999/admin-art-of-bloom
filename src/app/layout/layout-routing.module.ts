import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { AddProductDetailsComponent } from '../components/add-product-details/add-product-details.component';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductService } from '../services/product.service';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: "product-list",
        pathMatch: "full",
      },
      {
        path: "orders",
        component: OrdersComponent
      }, {
        path: "add-product",
        component: AddProductComponent
      },
      {
        path: "add-product-details/:id",
        component: AddProductDetailsComponent
      },
      {
        path: "product-list",
        component: ProductListComponent
      },
      {
        path: "edit-product/:id",
        component: EditProductComponent
      }]
  }
];

@NgModule({
  providers: [ProductService],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
