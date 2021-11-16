import { Injectable } from '@angular/core';
import { getDatabase, ref, push, serverTimestamp } from "firebase/database";
import { getAuth } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly $ref = ref(getDatabase(), 'plants')

  addProduct(data: any) {
    data.createdAt = serverTimestamp();
    data.updatedAt = serverTimestamp();
    data.user_id = getAuth().currentUser?.uid;
    return push(this.$ref, data);
  }
}
