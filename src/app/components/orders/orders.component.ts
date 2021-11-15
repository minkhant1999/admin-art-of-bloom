import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  token?: string;
  orders: any[] = [];

  constructor(private auth: AuthService, private order: OrderService) { }

  async ngOnInit() {
    this.token = await this.auth.getIdToken();
    this.getOrderList()
  }

  getOrderList() {
    if (!this.token) {
      return console.error('required: auth token')
    }
    this.order.getOrders(this.token).subscribe(data => {
      this.orders = Object.entries(data).map(([id, value]: [string, any]) => {
        let total = 0;
        value.items.forEach((item: any) => {
          total += item.price * item.quantity;
        });
        return {
          id, ...value, total
        }
      }).reverse();
      console.log(this.orders);

    })
  }

}
