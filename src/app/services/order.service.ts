import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDatabase, ref, get, query, orderByKey, limitToLast, startAfter, endBefore, startAt, endAt } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderUrl = "https://art-of-bloom-default-rtdb.firebaseio.com/orderDetails.json";
  constructor(private http: HttpClient) { }

  getOrdersFromHttp(auth: string) {
    return this.http.get<any>(this.orderUrl, { params: { auth } });
  }

  getLatestOrders(limit = 15) {
    let dbRef = ref(getDatabase(), 'orderDetails');
    let q = query(dbRef, orderByKey(), limitToLast(limit));
    return get(q);
  }

  getBeforeOrders(limit = 15, id: string) {
    let dbRef = ref(getDatabase(), 'orderDetails');
    let q = query(dbRef, orderByKey(), limitToLast(limit), startAfter(id));
    return get(q);
  }

  getAfterOrders(limit = 15, id: string) {
    let dbRef = ref(getDatabase(), 'orderDetails');
    let q = query(dbRef, orderByKey(), limitToLast(limit), endBefore(id));
    return get(q);
  }
}
