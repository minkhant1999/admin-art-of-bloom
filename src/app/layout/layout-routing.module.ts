import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    children: [{
      path: "orders",
      component: OrdersComponent
    }, {
      path: "add-product",
      component: AddProductComponent
    },
    {
      path: "product-list",
      component: ProductListComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
