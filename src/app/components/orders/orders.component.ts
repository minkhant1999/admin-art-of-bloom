import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private order: OrderService) { }

  ngOnInit() {
    this.getOrderList()
  }

  getOrderList() {
    this.order.getLatestOrders(10).then((data) => {
      this.orders = Object.entries(data.val()).map(([id, value]: [string, any]) => {
        let total = 0;
        value.items.forEach((item: any) => {
          total += item.price * item.quantity;
        });
        return {
          id, ...value, total
        }
      }).reverse();
    });
  }

  prev() {
    let firstOrder = this.orders[0];
    this.order.getBeforeOrders(10, firstOrder.id).then(data => {
      this.orders = Object.entries(data.val()).map(([id, value]: [string, any]) => {
        let total = 0;
        value.items.forEach((item: any) => {
          total += item.price * item.quantity;
        });
        return {
          id, ...value, total
        }
      }).reverse();
    });
  }

  next() {
    let lastOrder = this.orders[this.orders.length - 1];
    this.order.getAfterOrders(10, lastOrder.id).then(data => {
      this.orders = Object.entries(data.val()).map(([id, value]: [string, any]) => {
        let total = 0;
        value.items.forEach((item: any) => {
          total += item.price * item.quantity;
        });
        return {
          id, ...value, total
        }
      }).reverse();
    });
  }
}
