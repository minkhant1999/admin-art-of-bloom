import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderUrl = "https://art-of-bloom-default-rtdb.firebaseio.com/orderDetails.json";
  constructor(private http: HttpClient) { }

  getOrders(auth: string) {
    return this.http.get<any>(this.orderUrl, { params: { auth } });
  }
}
