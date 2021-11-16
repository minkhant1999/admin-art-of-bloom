import { Injectable } from '@angular/core';
import { getDatabase, ref, get, query, orderByKey, limitToLast, startAfter, endBefore, child, remove } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly $ref = ref(getDatabase(), 'orderDetails');

  getLatestOrders(limit = 15) {
    let q = query(this.$ref, orderByKey(), limitToLast(limit));
    return get(q);
  }

  getBeforeOrders(limit = 15, id: string) {
    let q = query(this.$ref, orderByKey(), limitToLast(limit), startAfter(id));
    return get(q);
  }

  getAfterOrders(limit = 15, id: string) {
    let q = query(this.$ref, orderByKey(), limitToLast(limit), endBefore(id));
    return get(q);
  }

  removeOrder(id: string) {
    let childRef = child(this.$ref, id);
    return remove(childRef);
  }


}
